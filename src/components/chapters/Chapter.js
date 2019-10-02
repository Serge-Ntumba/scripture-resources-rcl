import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import {
  Skeleton,
} from '@material-ui/lab';
import {Waypoint} from 'react-waypoint';

import { Verses } from '../verses/Verses';

export const Chapter = ({
  chapterKey,
  chapter,
  paragraphs,
  renderOffscreen,
  showUnsupported,
  direction,
}) => {
  const classes = useStyles();
  const [viewed, setViewed] = useState(renderOffscreen);
  
  const onVisibility = (isVisible) => {
    if (isVisible) setViewed(true);
  };
  const height = Object.keys(chapter).length * 20;
  const skeleton = (
    <>
      <Waypoint onEnter={onVisibility} />
      <Skeleton height={height} width='100%' className={classes.skeleton} />
    </>
  );
  const [verses, setVerses] = useState(skeleton);

  useEffect(() => {
    if (viewed) {
      const _verses = (
        <Verses
          verses={chapter}
          paragraphs={paragraphs}
          showUnsupported={showUnsupported}
          direction={direction}
        />
      );
      setVerses(_verses);
    }
  }, [chapterKey, chapter, paragraphs, viewed, showUnsupported, direction]);

  return (
    <div className={classes.chapter} dir={direction}>
      <Typography variant='h3'>{chapterKey}</Typography>
      {verses}
    </div>
  );
};

Chapter.propTypes = {
  chapterKey: PropTypes.string.isRequired,
  chapter: PropTypes.object.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  chapter: {
  },
}));

export default Chapter;
