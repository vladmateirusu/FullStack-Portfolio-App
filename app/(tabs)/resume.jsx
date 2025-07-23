import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.sectionHeader}>
          {expanded ? '▼' : '▶'} {title}
        </Text>
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
    </View>
  );
};
const SchoolSection = ({ school, city, year, program, notes }) => {
  return (
    <View style={{marginBottom:5}}>
      <Text style={styles.subHeader}>
        {school} -
        <Text style={styles.lightText}> {city}</Text>
      </Text>
      <Text style={styles.whiteText}>{year}</Text>
      <Text style={styles.programText}>{program}</Text>
      <Text style={styles.whiteText}>{notes}</Text>
    </View>
  );
};


export default function resume() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
        <Image
          source={require('../../assets/images/PIC.jpeg')}
          style={styles.image}
        />

        <AccordionSection title="Education">
          
         <SchoolSection 
            school={" McGill University"}
            city={"Montreal, Canada"}
            year={"Second Year"}
            program={"Honours Software Engineering | Minor in Entrepreneurship "}/>
            
         <SchoolSection 
            school={"Collège Jean-de-Brébeuf"}
            city={"Montreal, Canada"}
            year={"Graduated"}
            program={"Pure and applied sciences"}
            notes={"• Participated in networking events as an entrepreneurship club member."}/>
            
        </AccordionSection>

        <AccordionSection title="Skills">
          <Text style={styles.whiteText}>Coming soon...</Text>
        </AccordionSection>

        <AccordionSection title="Work Experience">
          <Text style={styles.whiteText}>Coming soon...</Text>
        </AccordionSection>

        <AccordionSection title="Contact Me">
          <Text style={styles.whiteText}>Coming soon...</Text>
        </AccordionSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
