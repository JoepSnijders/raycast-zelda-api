import { Detail } from "@raycast/api";

export const ShowTitleTags = (title: any, index: number) => {
    if (title?.name === "The Legend of Zelda: Ocarina of Time") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"green"} />;
    } else if (title.name === "The Legend of Zelda: Skyward Sword") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"purple"} />;
    } else if (title.name === "The Legend of Zelda: The Wind Waker") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"blue"} />;
    } else if (title.name === "The Legend of Zelda") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"grey"} />;
    } else if (title.name === "The Legend of Zelda: Link's Awakening") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"orange"} />;
    } else if (title.name === "The Legend of Zelda: Oracle of Seasons") {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"Tangerine"} />;
    } else {
        return <Detail.Metadata.TagList.Item key={index} text={title?.name} color={"#eed535"} />;
    }
}
