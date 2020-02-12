import React from 'react';

import g from '../../global';
import intl from '../../intl/intl';
import { useAnimation } from '../../utils/animation';
import { Animated, StyleSheet, Text } from '../Rn';

const css = StyleSheet.create({
  Container: {
    padding: 15,
  },
  Title: {
    fontSize: g.fontSizeTitle,
    lineHeight: g.lineHeightTitle,
    fontWeight: `bold`,
    color: `black`,
  },
  Description: {
    color: g.subColor,
  },
});

const Title = ({ compact, description, title }) => {
  const cssContainerA = useAnimation(compact, {
    paddingVertical: [15, 10],
  });
  const cssTitleA = useAnimation(compact, {
    fontSize: [g.fontSizeTitle, g.fontSizeSubTitle],
    lineHeight: [g.lineHeightTitle, 20],
  });
  return (
    <Animated.View style={[css.Container, cssContainerA]}>
      <Animated.Text
        style={[css.Title, cssTitleA]}
      >{intl`${title}`}</Animated.Text>
      {!compact && (
        <Text style={css.Description}>{intl`${description}` || `\u200a`}</Text>
      )}
    </Animated.View>
  );
};

export default Title;
