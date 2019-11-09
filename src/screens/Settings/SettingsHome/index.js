import React, { useState, useRef } from 'react';
import { View } from 'react-native';

import Container from '@components/Container';
import { Title } from '@components/typography';
import {
  HeaderContainer,
  ScrollView,
  TitleWrapper,
  Wrapper,
  PADDING
} from './components';

import Theme from '../Theme';

import { settingsScreenProps } from '@types';

const sections = [
  {
    Component: Theme,
    title: 'Theme'
  }
];

const SettingsHome = ({ screenProps }) => {
  const [currentTitle, setCurrentTitle] = useState(sections[0].title);
  const [sectionInfo, setSectionInfo] = useState([]);
  const scrollRef = useRef(null);

  const onScroll = ({ nativeEvent }) =>
    sectionInfo.map(
      ({ height, section, y }) =>
        nativeEvent.contentOffset.y > y &&
        nativeEvent.contentOffset.y < height + y + PADDING &&
        setCurrentTitle(section)
    );

  const onLayout = title => ({ nativeEvent }) =>
    setSectionInfo(sectionInfo => [
      ...sectionInfo,
      {
        height: nativeEvent.layout.height,
        section: title,
        y: nativeEvent.layout.y
      }
    ]);

  const scrollToSection = title => () => {
    if (scrollRef.current) {
      const { y } = sectionInfo.find(section => section.section === title);
      scrollRef.current.scrollTo({ y: y + PADDING });
    }
  };

  return (
    <Container title="Settings">
      <Wrapper>
        <HeaderContainer>
          <Title>{currentTitle}</Title>
        </HeaderContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
          ref={ref => (scrollRef.current = ref)}
        >
          {sections.map(({ Component, title }, index) => (
            <View key={title} onLayout={onLayout(title)}>
              <TitleWrapper onPress={scrollToSection(title)}>
                {index !== 0 && (
                  <Title
                    color={title === currentTitle ? 'primary' : 'textDefault'}
                  >
                    {title}
                  </Title>
                )}
              </TitleWrapper>
              <Component screenProps={screenProps} />
            </View>
          ))}
        </ScrollView>
      </Wrapper>
    </Container>
  );
};

SettingsHome.propTypes = {
  screenProps: settingsScreenProps
};

export default SettingsHome;
