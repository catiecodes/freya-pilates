"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs font-sans rounded transition-colors ${
        active
          ? "bg-olive text-white"
          : "text-charcoal-light hover:bg-cream hover:text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-cream-dark mx-1 inline-block" />;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] px-5 py-4 text-sm text-charcoal leading-relaxed focus:outline-none prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-light prose-table:w-full prose-td:border prose-td:border-cream-dark prose-td:p-2 prose-th:border prose-th:border-cream-dark prose-th:p-2 prose-th:bg-cream",
      },
    },
  });

  // Sync external value changes (e.g. loading an existing post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  function setLink() {
    const prev = editor?.getAttributes("link").href ?? "";
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }

  function insertTable() {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }

  if (!editor) return null;

  return (
    <div className="border border-cream-dark bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-cream-dark bg-white sticky top-0 z-10">
        {/* Text style */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <span className="line-through">S</span>
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          H3
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Paragraph">
          P
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          • List
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
          1. List
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left">
          ←
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center">
          ≡
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right">
          →
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Add link">
          Link
        </ToolbarButton>

        <Divider />

        {/* Table */}
        <ToolbarButton onClick={insertTable} title="Insert table">
          Table
        </ToolbarButton>
        {editor.isActive("table") && (
          <>
            <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add column before">
              +Col←
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column after">
              +Col→
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete column">
              −Col
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} title="Add row before">
              +Row↑
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row after">
              +Row↓
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} title="Delete row">
              −Row
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table">
              ✕ Table
            </ToolbarButton>
          </>
        )}

        <Divider />

        {/* Block */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          " "
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
          —
        </ToolbarButton>

        <Divider />

        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          ↺
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          ↻
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
