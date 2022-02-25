import React from "react";
import styled from "styled-components";
import StoryCircle from "components/Common/StoryCircle";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as SettingSvg } from "assets/Svgs/setting.svg";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import Button from "styles/UI/Button/Button";
import { useAppSelector } from "../../../app/store/Hooks";
import Profile from "../../../pages/Profile";

interface ProfileHeaderContainerProps {
    me: boolean;
}

const ProfileHeaderContainer = styled.header<ProfileHeaderContainerProps>`
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
  align-items: stretch;

  .profile-img {
    margin-right: 30px;
    display: flex;
    justify-content: center;

  }

  .profile-content {

    .name-with-icon {
      display: flex;
      align-items: center;
      flex-shrink: 1;

      .name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 300;
        font-size: 28px;
        line-height: 32px;
        margin: -5px 0 -6px;
      }

      .edit {
        background-color: transparent;
        margin-left: 20px;
        border: ${props => props.me && '1px solid #dbdbdb'};
        border-radius: 4px;
        color: #262626;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        padding: 5px 9px;
        text-align: center;
        text-overflow: ellipsis;
      }

      svg {
        margin: 8px;
      }
    }

    .follower {
      display: flex;
      margin-bottom: 20px;

      .follower-with-number {
        margin-right: 40px;
        font-size: 16px;

        span {
          font-weight: 600;
        }
      }
    }

    .detail-info {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }
  }

  @media (min-width: 736px) {
    margin-bottom: 44px;

    .profile-img {
      flex-grow: 1;
    }

    .profile-content {
      flex-basis: 30px;
      flex-grow: 5;

      .name-with-icon {
        margin-bottom: 20px;
      }
    }
  }
`;


interface ProfileHeaderProps {
}

const ProfileHeader = ({}:ProfileHeaderProps) => {
    const memberProfile  = useAppSelector(state => state.profile.memberProfile as Profile.MemberProfileProps)
    return (
        <ProfileHeaderContainer me={memberProfile?.me}>
            <div className="profile-img">
                <StoryCircle
                    type="read" // 백엔드 소통 후 읽었는지 여부 확인
                    avatarUrl={memberProfile?.memberImage.imageUrl}
                    username={"chanhyuk"}
                    scale={2.5}
                />
            </div>
            <section className="profile-content">
                <div className="name-with-icon">
                    <h2 className="name">{memberProfile?.memberUsername}</h2>
                    {/*나와 타인에 따라서 아이콘을 다르게 랜더링 해줍니다*/}
                    {
                        memberProfile?.me ?
                            <>
                                <Link className="edit" to={"/accounts/edit"}>프로필 편집</Link>
                                <SettingSvg />
                            </> :
                            <>
                                <Link className="edit" to={"/"}><Button>팔로우</Button></Link>
                                <ThreeDots />
                            </>
                    }
                </div>
                <ul className="follower">
                    <li className="follower-with-number">
                        게시물 <span>{memberProfile?.memberPostsCount}</span>
                    </li>
                    <li className="follower-with-number">
                        팔로워 <span>{memberProfile?.memberFollowersCount}</span>
                    </li>
                    <li className="follower-with-number">
                        게시물 <span>{memberProfile?.memberFollowingsCount}</span>
                    </li>
                </ul>
                <div className="detail-info">{memberProfile?.memberName}</div>
            </section>
        </ProfileHeaderContainer>
    );
};

export default ProfileHeader;