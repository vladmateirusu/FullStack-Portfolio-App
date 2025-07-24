import { StyleSheet } from "react-native";

export const resumeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
  flexGrow: 1,
  alignItems: 'center',
  padding: 16,
},
  section: {
    width: 300,
    borderRadius: 6,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
  },
  sectionHeader: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  whiteText: {
    color: 'white',
    marginBottom: 5,
  },
  subHeader: {
    fontWeight: '600',
    color: 'white',
  },
  lightText: {
    fontWeight: '100',
    color: 'white',
  },
  programText:{
    fontStyle: 'italic',
    color:"white",
  }
});
