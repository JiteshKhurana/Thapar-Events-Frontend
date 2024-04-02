"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading"
// import { Heading } from "lucide-react";

const Tiptap = ({ onChange }: any) => {

  const editor = useEditor({
    extensions: [StarterKit.configure({}), Underline,
        Heading.configure({
            HTMLAttributes: {
                class: "font-bold text-xl"
            },
        }),
    ],
    editorProps: {
      attributes: {
        class:
          "p-3 w-full min-h-[400px] border rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
