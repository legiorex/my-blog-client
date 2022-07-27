import { FC } from 'react'

import styles from './UserInfo.module.scss'

type Props = {
  fullName: string
  additionalText: string
  avatarUrl?: string
}

const mockAvatar =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png'

const UserInfo: FC<Props> = ({ fullName, additionalText, avatarUrl = mockAvatar }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
export default UserInfo
