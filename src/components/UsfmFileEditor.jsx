/* eslint-disable test-selectors/button, test-selectors/onClick */
import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { UsfmEditor } from 'simple-text-editor-rcl';

import { getSectionChapter, getBlockVerse } from '../helpers/getChapterVerse';
import OpenFile from './OpenFile';
import ExportFile from './ExportFile';
import { styles } from './UsfmFileEditor.styles';
import FontDropdown from './FontDropdown';
import FontSizeDropdown from './FontSizeDropdown';
import LineHeightDropdown from './LineHeightDropdown';

export default function UsfmFileEditor({
  align,
  sectionIndex,
  onSectionIndex,
  reference,
  onReference,
  file,
  onFile: _onFile,
  type,
}) {
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(false);
  const [preview, setPreview] = useState(true);

  const onSectionable = () => { setSectionable(!sectionable); };

  const onBlockable = () => { setBlockable(!blockable); };
  
  const onEditable = () => { setEditable(!editable); };
  
  const onPreview = () => { setPreview(!preview); };

  const onFile = useCallback((_file) => { _onFile({ file: _file, type }); }, [_onFile, type]);

  const onText = useCallback((text) => {
    onFile({
      name: file.name,
      content: text,
      lastModified: file.lastModified,
    });
  }, [file.name, file.lastModified, onFile]);

  const [target, setTarget] = useState(false);

  useEffect(() => {
    if (type === 'target') setTarget(true);
  }, [type]);

  const disabled = (!file.name || !file.content);
  const disabledbyalign = (align || disabled);
  
  useEffect(() => {
    if (align) setSectionable(true);
  }, [align]);

  const [selectedFont, setSelectedFont] = useState('monospace');
  const fontButton = useMemo(() => <FontDropdown selectedFont={selectedFont} setSelectedFont={setSelectedFont} />, [selectedFont]);

  const [selectedFontSize, setSelectedFontSize] = useState('1em');
  const fontSizeButton = useMemo(() => <FontSizeDropdown selectedFontSize={selectedFontSize} setSelectedFontSize={setSelectedFontSize} />, [selectedFontSize]);

  const [selectedLineHeight, setSelectedLineHeight] = useState('normal');
  const lineHeightButton = useMemo(() => <LineHeightDropdown selectedLineHeight={selectedLineHeight} setSelectedLineHeight={setSelectedLineHeight} />, [selectedLineHeight]);

  const textEditor = useMemo(() => {
    const onVerse = (verse) => {
      onReference({ bookId: reference.bookId, chapter: reference.chapter, verse });
    };

    const onChapter = (chapter) => {
      onReference({ bookId: reference.bookId, chapter, verse: undefined });
    };

    const onSectionClick = ({ text: _text, index }) => {
      onSectionIndex(index);
      const chapter = getSectionChapter(_text);
      onChapter(chapter);
    };

    // eslint-disable-next-line no-unused-vars
    const onBlockClick = ({ text: _text, index }) => {
      const verse = getBlockVerse(_text);
      onVerse(verse);
    };

    const editorProps = {
      text: file.content || '',
      onText,
      editable,
      sectionable,
      blockable,
      preview,
      sectionIndex,
      onSectionClick,
      onBlockClick,
      selectedFont,
      setSelectedFont,
      selectedFontSize,
      setSelectedFontSize,
      selectedLineHeight,
      setSelectedLineHeight,
    };

    return <div style={{ fontFamily: selectedFont, fontSize: selectedFontSize, lineHeight: selectedLineHeight }}><UsfmEditor {...editorProps} /></div>;
  }, [
    file.content, onText, editable, sectionable, blockable, preview, sectionIndex, onSectionIndex,
    onReference, reference.chapter, reference.bookId, selectedFont, setSelectedFont,
    selectedFontSize, setSelectedFontSize, selectedLineHeight, setSelectedLineHeight,
  ]);

  return (
    <div style={styles.textFileEditor}>
      <div style={styles.toolbar}>
        <div className="btnGroup" role="group">
          <OpenFile onFile={onFile} />
          {/** Chapters are Sections */}
          <button type="button" className={(sectionable ? 'btnAll btnMiddle on' : 'btnAll btnMiddle')} disabled={disabledbyalign} onClick={onSectionable}>Chapters</button>
          <button type="button" className={(blockable ? 'btnAll btnMiddle' : 'btnAll btnMiddle on')} disabled={disabled} onClick={onBlockable}>Paragraphs</button>
          { target && <button type="button" className={(editable ? 'btnAll btnMiddle on' : 'btnAll btnMiddle')} disabled={disabled} onClick={onEditable}>Editable</button> }
          <button type="button" className={(preview ? 'btnAll btnMiddle on' : 'btnAll btnMiddle')} disabled={disabled} onClick={onPreview}>Preview</button>
          { target && <ExportFile file={file} /> }
          {fontButton}
          {fontSizeButton}
          {lineHeightButton}
        </div>
      </div>
      <hr />
      <h2 style={{ textAlign: 'center' }}>{file.name}</h2>
      {textEditor}
    </div>
  );
}

UsfmFileEditor.propTypes = {
  /** Preload file content if need to file open bypass */
  file: PropTypes.object.isRequired,
  /** Function triggered on file open */
  onFile: PropTypes.func.isRequired,
  /** Editable? */
  editable: PropTypes.bool,
  /** Align? */
  align: PropTypes.bool,
  /** Reference: { bookId, chapter, verse } */
  reference: PropTypes.object.isRequired,
  /** Function to update reference */
  onReference: PropTypes.func.isRequired,
  /** Section (Chapter) Index */
  sectionIndex: PropTypes.number,
  /** Section (Chapter) Selection */
  onSectionIndex: PropTypes.func.isRequired,
  /** Type */
  type: PropTypes.string.isRequired,
};

UsfmFileEditor.defaultProps = {
  editable: false,
  align: true,
  sectionIndex: 1,
  // sectionable: true,
};
