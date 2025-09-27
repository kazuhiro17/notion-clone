import { TitleInput } from '@/components/Toolbar';
import { Note } from '@/types/note';

const NoteDetail = () => {
  // Mock note data for development
  const mockNote: Note = {
    id: 1,
    displayTitle: 'サンプルノート',
    title: 'サンプルノート',
    content: '',
  };

  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput
          initialData={mockNote}
          onTitleChange={() => {}}
        />
      </div>
    </div>
  );
};

export default NoteDetail;
