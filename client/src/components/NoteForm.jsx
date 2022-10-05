import '../styles/index.css';
import React from 'react';

export default function NoteForm({
  note: { noteTitle, setNoteTitle, noteContent, setNoteContent, onSubmit },
}) {
  const labelClass = 'px-1 font-semibold text-gray-600';

  return (
    <form
      className="flex flex-col h-[calc(100%-64px)] w-[100%] self-end p-2 gap-1"
      onSubmit={onSubmit}
    >
      <label className={labelClass}>Note Title</label>
      <input
        className="p-2 text-2xl outline-none bg-blue-50 rounded border-2 border-blue-50 focus:border-blue-300"
        type="text"
        placeholder="Note Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)} // fix: got the value of the target not the event
      />
      <label className={labelClass}>Note Content</label>
      <textarea
        className="flex-1 p-2 text-xl outline-none text-gray-500 bg-blue-50 rounded border-2 border-blue-50 focus:border-blue-300 resize-none"
        placeholder="Note Content"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)} // fix: got the value of the target not the event
      />
      <button
        className="bg-yellow-400 w-fit self-end px-3 py-[2px] rounded text-xl"
        type="submit"
      >
        save
      </button>
    </form>
  );
}
