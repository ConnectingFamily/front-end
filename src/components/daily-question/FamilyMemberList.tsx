import FamilyMemberItem from "./FamilyMemberItem";
import MyAnswerCard from "./MyAnswerCard";

interface FamilyMember {
  userId: number;
  name: string;
  status: "locked" | "not_answered" | "answered";
  answer?: string;
}

interface FamilyMemberListProps {
  myAnswered: boolean;
  myAnswer: string;
  isMyAnswerExpanded: boolean;
  familyMembers: FamilyMember[];
  isAllAnswered: boolean;
  expandedMembers: Record<string, boolean>;
  nudgedMembers: Record<string, boolean>;
  onToggleMyAnswer: () => void;
  onToggleMemberAnswer: (memberName: string) => void;
  onNudge: (memberName: string) => void;
}

const FamilyMemberList = ({
  myAnswered,
  myAnswer,
  isMyAnswerExpanded,
  familyMembers,
  isAllAnswered,
  expandedMembers,
  nudgedMembers,
  onToggleMyAnswer,
  onToggleMemberAnswer,
  onNudge,
}: FamilyMemberListProps) => {
  return (
    <div className="flex flex-col">
      {myAnswered && (
        <MyAnswerCard
          answer={myAnswer}
          isExpanded={isMyAnswerExpanded}
          onToggle={onToggleMyAnswer}
        />
      )}
      {familyMembers.map((member) => (
        <FamilyMemberItem
          key={member.userId}
          member={member}
          isAllAnswered={isAllAnswered}
          isExpanded={expandedMembers[member.name] || false}
          isNudged={nudgedMembers[member.name] || false}
          onToggle={() => onToggleMemberAnswer(member.name)}
          onNudge={() => onNudge(member.name)}
        />
      ))}
    </div>
  );
};

export default FamilyMemberList;

