import { Reply } from '../../../../redux/interfaces';

export interface ReplyInput
  extends Omit<Reply, 'id' | 'user' | 'createdAt' | 'commentId'> {
  userId: string;
}
