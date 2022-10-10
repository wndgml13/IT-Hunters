import { CommentGet } from "../types/postsDetailType";

export const EachComment = (data: CommentGet) => {
  return (
    <div key={data.commentId} className="flex justify-between gap-2">
      <textarea
        id="message"
        rows={2}
        className="mb-2 block p-2.5 mt-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="수정할 내용을 입력해 주세요."
      />
      <button
        type="button"
        className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-12 rounded-lg border-none"
      >
        Edit
      </button>
      <button
        type="button"
        className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-12 rounded-lg border-none"
      >
        Cancel
      </button>
    </div>
  );
};
