import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
import { Comment } from "./Comment";

const KeyReportCommentSection = (props: any) => {
  const { keyReportsComment } = props;
  const currentYear = new Date().getFullYear();
  return (
    <>
      {keyReportsComment?.comments
        ?.filter((item: any) => {
          const commentDate = new Date(item.date);
          const commentYear = commentDate.getFullYear();
          const commentQuarter = Math.floor((commentDate.getMonth() + 3) / 3);

          return (
            commentYear === currentYear &&
            commentQuarter === getCurrentQuarterNumber()
          );
        })
        ?.map((item: any, i: number) => {
          console.log(item, "comments");
          return (
            <Comment
              key={i} // Added key prop for React list rendering
              commentData={item}
              ifLast={i === (keyReportsComment?.comments?.length ?? 0) - 1}
            />
          );
        })}
    </>
  );
};

export default KeyReportCommentSection;
