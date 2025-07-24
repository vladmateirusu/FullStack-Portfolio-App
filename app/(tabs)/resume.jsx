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

import {resumeStyles} from '../../assets/styles/resume'


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
    <View style={resumeStyles.section}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={resumeStyles.sectionHeader}>
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
      <Text style={resumeStyles.subHeader}>
        {school} -
        <Text style={resumeStyles.lightText}> {city}</Text>
      </Text>
      <Text style={resumeStyles.whiteText}>{year}</Text>
      <Text style={resumeStyles.programText}>{program}</Text>
      <Text style={resumeStyles.whiteText}>{notes}</Text>
    </View>
  );
};


export default function Resume() {
  return (
    <SafeAreaView style={resumeStyles.safeArea}>
      <ScrollView contentContainerStyle={[resumeStyles.container, { flexGrow: 1 }]}>
        <Image
          source={require('../../assets/images/PIC.jpeg')}
          style={resumeStyles.image}
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
          <Text style={resumeStyles.whiteText}>Coming soon...</Text>
        </AccordionSection>

        <AccordionSection title="Work Experience">
          <Text style={resumeStyles.whiteText}>Coming soon...</Text>
        </AccordionSection>

        <AccordionSection title="Contact Me">
          <Text style={resumeStyles.whiteText}>Coming soon...</Text>
        </AccordionSection>
      </ScrollView>
    </SafeAreaView>
  );
};
