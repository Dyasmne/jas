import React from "react";
import { View, TextInput, Pressable, FlatList, Text } from "react-native";
import { router } from "expo-router";
import DashboardHeader from "../../components/ui/DashboardHeader";
import StatsCard from "../../components/ui/StatsCard";
import NoteItem from "../../components/ui/NoteItem";
import { useNotes, Note } from "../../hooks/useNotes";
import { styles } from "../../styles/dashboardStyles";

export default function DashboardScreen() {
  const { text, setText, notes, done, addNote, toggleNote, deleteNote } = useNotes();

  // Pass full note object to Details screen
  function openDetails(note: Note) {
    router.push({
      pathname: "/notes/[id]",
      params: {
        id: note.id,
        text: note.text,
        done: String(note.done),
      },
    } as any);
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <DashboardHeader title="Dashboard" subtitle="Notes App" />

        <View style={styles.statsRow}>
          <StatsCard label="Total" value={notes.length} />
          <StatsCard label="Done" value={done} />
          <StatsCard label="Pending" value={notes.length - done} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Add note..."
            placeholderTextColor="#888"
          />
          <Pressable style={styles.addBtn} onPress={addNote}>
            <Text style={styles.addBtnText}>ADD</Text>
          </Pressable>
        </View>

        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => openDetails(item)}>
              <NoteItem item={item} onToggle={toggleNote} onDelete={deleteNote} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}