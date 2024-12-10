import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AcceptRejectAllButtons from "./AcceptRejectAllButtons";
import FeedbackButtons from "./FeedbackButtons";
import UndoAndRedoButtons from "./UndoAndRedoButtons";
import { ChatHistoryItem } from "core";
import { stripImages } from "core/llm/images";
import { CopyIconButton } from "../gui/CopyIconButton";

export interface EditActionsProps {
  index: number;
  item: ChatHistoryItem;
}

export default function EditActions({ index, item }: EditActionsProps) {
  // const curCheckpointIndex = useSelector(
  //   (store: RootState) => store.state.curCheckpointIndex,
  // );

  const active = useSelector((state: RootState) => state.state.active);

  const applyStates = useSelector(
    (state: RootState) => state.state.applyStates,
  );

  const pendingApplyStates = applyStates.filter(
    (state) => state.status === "done",
  );

  const hasClosedAllStreams = applyStates.every(
    (state) => state.status === "closed",
  );

  // const isCurCheckpoint = Math.floor(index / 2) === curCheckpointIndex;
  const hasPendingApplies = pendingApplyStates.length > 0;

  if (active) return;

  return (
    <div
      className={`mx-2 mb-2 mt-2 flex h-7 items-center justify-between pb-0 text-xs text-gray-400`}
    >
      <div className="flex-1" />

      {/* {isCurCheckpoint && (
        <div className="flex-2 flex justify-center">
          {hasPendingApplies && (
            <AcceptRejectAllButtons pendingApplyStates={pendingApplyStates} />
          )}
          {hasClosedAllStreams && <UndoAndRedoButtons />}
        </div>
      )} */}

      <div className="flex-2 flex justify-center">
        {hasPendingApplies && (
          <AcceptRejectAllButtons pendingApplyStates={pendingApplyStates} />
        )}
        {/* {hasClosedAllStreams && <UndoAndRedoButtons />} */}
      </div>

      <div className="flex flex-1 justify-end">
        <CopyIconButton
          tabIndex={-1}
          text={stripImages(item.message.content)}
          clipboardIconClassName="h-3.5 w-3.5 text-gray-500"
          checkIconClassName="h-3.5 w-3.5 text-green-400"
        />

        <FeedbackButtons item={item} />
      </div>
    </div>
  );
}
