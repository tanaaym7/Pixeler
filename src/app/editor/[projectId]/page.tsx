import { protectedRoute } from "@/features/auth/utils";
import Editor from "@/features/editor/components/editor";

const EditorProjectIdPage = async () => {
  {
    await protectedRoute();
    return (
      <div className="h-full">
        <Editor />
      </div>
    );
  }
};

export default EditorProjectIdPage;
