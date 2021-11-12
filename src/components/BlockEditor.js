import { useMemo } from "react";

export default function BlockEditor ({ onVerse, text, dangerouslySetInnerHTML, ...props }) {

  const onBlockClick = (e) => {
    const regex = /\\v *(\d+)/;
    const _text = e.target.innerText;
    const match = regex.exec(_text);
    const verse = match && match[1];
    onVerse(verse);
  };

  const editorStyle = {
    width: '100%',
    whiteSpace: 'pre-wrap',
    padding: '0 0.2em'
  };

  const markerText = useMemo(() => {
    const markerRegex = /(\\\w{1,2} *\d*)/g;
    const replacer = "<strong>$1</strong>";
    const _markerText = text.replace(/</g, '&lt;').replace(markerRegex, replacer);
    return _markerText;
  }, [text]);
  
  return (
    <>
      <div
        {...props}
        onClick={onBlockClick}
        style={editorStyle}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: markerText }}
      >
      </div>
      <hr />
    </>
  );
};