// HabitTracker.jsx

import { useEffect, useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import getDb from '../../src/config/database';
import { useTheme } from "../../src/config/ThemeContext";


const HabitTracker = () => {

const { themeObject } = useTheme();

  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ name: '', time: '', id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  // Create table if not exists
  useEffect(() => {
    (async () => {
      const db = await getDb();
      await db.execAsync('CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, time TEXT, completed INTEGER)');
      fetchHabits();
    })();
  }, []);


  // Fetch habits from DB
  async function fetchHabits() {
    const db = await getDb();
    const result = await db.getAllAsync('SELECT * FROM habits');
    setHabits(result);
    setLoading(false);
  }


  // Add or update habit
  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.time) return;
    // Validate time format HH:MM (24-hour, 00:00-23:59)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(form.time)) {
      setError('Time must be in 24-hour format (HH:MM), e.g. 00:00 or 23:59');
      return;
    }
    const db = await getDb();
    if (editing) {
      await db.runAsync('UPDATE habits SET name = ?, time = ? WHERE id = ?', form.name, form.time, form.id);
      setEditing(false);
    } else {
      await db.runAsync('INSERT INTO habits (name, time, completed) VALUES (?, ?, ?)', form.name, form.time, 0);
    }
    setForm({ name: '', time: '', id: null });
    fetchHabits();
  };


  // Edit habit
  const handleEdit = habit => {
    setForm({ name: habit.name, time: habit.time, id: habit.id });
    setEditing(true);
  };


  // Delete habit
  const handleDelete = async id => {
    setHabitToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (habitToDelete !== null) {
      const db = await getDb();
      await db.runAsync('DELETE FROM habits WHERE id = ?', habitToDelete);
      setHabitToDelete(null);
      setDeleteModalVisible(false);
      fetchHabits();
    }
  };

  const cancelDelete = () => {
    setHabitToDelete(null);
    setDeleteModalVisible(false);
  };


  // Toggle complete
  const handleComplete = async id => {
    const habit = habits.find(h => h.id === id);
    const db = await getDb();
    await db.runAsync('UPDATE habits SET completed = ? WHERE id = ?', habit.completed ? 0 : 1, id);
    fetchHabits();
  };

  // Progress calculation
  const progress = habits.length ? habits.filter(h => h.completed).length / habits.length : 0;

  if (loading) return (
    <View style={styles.container}><Text>Loading...</Text></View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeObject.background }]}>
      <Text style={[styles.title,{color:themeObject.primary}]}>Daily Habit Tracker</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}% Complete</Text>
      </View>
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text> : null}
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input,{color: themeObject.text, backgroundColor: themeObject.inputBg }]}
          placeholderTextColor={themeObject.pText}
          placeholder="Habit name"
          value={form.name}
          onChangeText={text => setForm({ ...form, name: text })}
        />
        <TextInput
          style={[styles.input,{color: themeObject.text, backgroundColor: themeObject.inputBg }]}
          placeholderTextColor={themeObject.pText}
          placeholder="Time (e.g. 08:00)"
          value={form.time}
          onChangeText={text => setForm({ ...form, time: text })}
        />
      </View>
      <View style={styles.formRow}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button title={editing ? 'Update' : 'Add'} onPress={handleSubmit} />
        </View>
        {editing && (
          <View style={{ flex: 1 }}>
            <Button title="Cancel" color="#888" onPress={() => { setEditing(false); setForm({ name: '', time: '', id: null }); }} />
          </View>
        )}
      </View>
      <FlatList
        data={habits}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.habitName,{color:themeObject.text}]}>{item.name} <Text style={styles.habitTime}>- {item.time}</Text></Text>
              <View style={styles.progressBarBgSmall}>
                <View style={[styles.progressBarSmall, { width: item.completed ? '100%' : '0%' }]} />
              </View>
              <Text style={styles.statusText}>{item.completed ? 'Done' : 'Pending'}</Text>
            </View>
            <View style={styles.habitActions}>
              <TouchableOpacity onPress={() => handleComplete(item.id)} style={styles.actionBtn}>
                <Text style={{ color: '#3674B5' }}>{item.completed ? 'Undo' : 'Done'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionBtn}>
                <Text style={{ color: '#3674B5' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>No habits yet.</Text>}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>Are you sure you want to delete this habit?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancel" onPress={cancelDelete} color="#888" />
              <Button title="Delete" onPress={confirmDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HabitTracker;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3674B5',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    width: '100%',
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3674B5',
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 2,
    color: '#3674B5',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3673b53a',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  habitName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#131D4F',
  },
  habitTime: {
    color: '#888',
    fontSize: 12,
  },
  progressBarBgSmall: {
    width: 100,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarSmall: {
    height: '100%',
    backgroundColor: '#3674B5',
  },
  statusText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  habitActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 8,
    gap: 4,
  },
  actionBtn: {
    padding: 4,
  },
});