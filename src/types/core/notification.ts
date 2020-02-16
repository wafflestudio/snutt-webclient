export interface Notification {
  user_id: string;
  message: string;
  created_at: Date;
  type: NotificationTypeEnum;
  detail?: any;
}

/**
 * Types
 * - Type.NORMAL      : Normal Messages. Detail would be null
 * - Type.COURSEBOOK  : Course Book Changes. Detail contains lecture difference
 * - Type.LECTURE     : Lecture Changes. Course book changes are for all users.
 *                      Lecture changes contains per-user update log.
 * - Type.LINK_ADDR   : 사용자가 클릭하면 브라우저로 연결되도록 하는 알림
 */
export enum NotificationTypeEnum {
  NORMAL = 0,
  COURSEBOOK = 1,
  LECTURE_UPDATE = 2,
  LECTURE_REMOVE = 3,
  LINK_ADDR = 4,
}
