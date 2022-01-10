import styled from "styled-components";
import Card from "styles/UI/Card";
import { useRef, useState } from "react";
import ArticleHeader from "components/Home/Article/ArticleHeader";
import ArticleImgSlider from "components/Home/Article/ArticleImgSlider";
import ArticleMainIcons from "components/Home/Article/ArticleMainIcons";
import ArticleMain from "components/Home/Article/ArticleMain";
import CommentForm from "components/Home/Article/CommentForm";
import { HomeType } from "@type";
import useGapText from "Hooks/useGapText";
import useOnView from "Hooks/useOnView";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;
    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 16px;
        color: ${(props) => props.theme.font.gray};
        font-size: 10px;
    }
    .article-form-layout {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        form {
            width: 100%;
        }
    }
`;

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({
    article,
    isObserving,
}: {
    article: HomeType.ArticleProps;
    isObserving: boolean;
}) => {
    // data state
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    // like state
    const [isLiked, setIsliked] = useState(article.postLikeFlag);
    const gapText = useGapText(article.postUploadDate);

    const articleRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(articleRef);
    isVisible && isObserving && console.log("visible"); // 이 때 비동기 작업 및 무한 스크롤

    const toggleLikeHandler = (): void => {
        setIsliked((prev: boolean) => !prev);
    };

    const changeToLikeHandler = (): undefined => {
        if (isLiked) return;
        setIsliked(true);
    };

    return (
        <ArticleCard as="article" ref={articleRef}>
            <ArticleHeader
                memberImageUrl={article.memberImageUrl}
                memberNickname={article.memberNickname}
            />
            <ArticleImgSlider
                imageDTOs={article.postImageDTOs}
                onLike={changeToLikeHandler}
            />
            <ArticleMainIcons
                isLiked={isLiked}
                onToggleLike={toggleLikeHandler}
            />
            <ArticleMain
                followingUserWhoLikesArticle={followingUserWhoLikesArticle}
                likesCount={article.postLikesCount}
                memberImageUrl={article.memberImageUrl}
                memberNickname={article.memberNickname}
                content={article.postContent}
                commentsCount={article.postCommentsCount}
                // comments={article.comments}
            />
            <div className="article-createdAt">{gapText}</div>
            <div className="article-form-layout">
                <CommentForm />
            </div>
        </ArticleCard>
    );
};

export default Article;
