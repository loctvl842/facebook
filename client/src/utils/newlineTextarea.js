import { emojify } from 'react-emoji';

export const newlineTextarea = (content) => {
  // split content string to multiple lines by '\n'
  var lines = content.split('\n');
  return lines.map((line, index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      {emojify(line.trim())}
    </div>
  ));
};
