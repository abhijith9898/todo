import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');


  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };


  const toggleStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your task here"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button title="Add" color="#000" style={styles.buttonColor} onPress={addTask} disabled={!taskTitle.trim()} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={[styles.taskTitle, item.status && styles.done]}>
              {item.title}
            </Text>
            <Switch
              value={item.status}
              thumbColor={item.status ? '#000' : 'grey'}
              trackColor={{ false: 'grey', true: 'grey' }}
              onValueChange={() => toggleStatus(item.id)}
            />
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Icon name="delete" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonColor:{
    backgroundColor:'#000',
    color:'white'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 8,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    flex: 1,
  },
  done: {
    color: 'grey',
  },
});

export default App;
