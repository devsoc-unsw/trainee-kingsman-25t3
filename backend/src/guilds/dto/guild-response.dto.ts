export class GuildResponseDto {
  id: number;
  name: string;
  description: string;
  goal_tasks: number;
  current_tasks: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  members?: MemberResponseDto[];
}

export class MemberResponseDto {
  id: number;
  userId: number;
  name: string;
  tasks_contributed: number;
  joinedAt: Date;
}




