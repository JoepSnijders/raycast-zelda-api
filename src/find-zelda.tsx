import { Action, ActionPanel, Detail, LaunchProps, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";

interface ZeldaData {
    name: string;
    description: string;
    released_date: string;
    developer: string;
    publisher: string;
}

interface Response {
    isLoading: boolean;
    error?: object;
    data?: object;
}

// Returns the main React component for a view command
export default function Command() {
    const { data, error, isLoading } = useFetch<Response>("https://zelda.fanapis.com/api/games");
    const responseData: any = data?.data;

    return (
        <List isLoading={isLoading}>
            {responseData.map((info: any) => (
                <List.Item
                    title={info.name}
                    subtitle={info.released_date}
                    key={info.id}
                    actions={
                        <ActionPanel>
                            <Action.Push title="View Details" target={<InfoDetail info={info} />}></Action.Push>
                        </ActionPanel>
                    }
                ></List.Item>
            ))}
        </List>
    );

    function InfoDetail(props: { info: ZeldaData }) {
        const markdown = `
# ${props?.info?.name}

${props?.info?.description}
        `;
        return (
            <Detail
                markdown={markdown}
                metadata={
                    <Detail.Metadata>
                        <Detail.Metadata.TagList title="Publisher">
                            <Detail.Metadata.TagList.Item text={props?.info?.publisher} color={"green"} />
                        </Detail.Metadata.TagList>
                        <Detail.Metadata.TagList title="Developer">
                            <Detail.Metadata.TagList.Item text={props?.info?.developer} color={"green"} />
                        </Detail.Metadata.TagList>
                        <Detail.Metadata.TagList title="Year">
                            <Detail.Metadata.TagList.Item text={props?.info?.released_date} color={"green"} />
                        </Detail.Metadata.TagList>
                    </Detail.Metadata>
                }
                actions={
                    <ActionPanel>
                        <Action.CopyToClipboard
                            title="Copy Description"
                            content={props.info.description}
                        ></Action.CopyToClipboard>
                    </ActionPanel>
                }
            />
        );
    }
}
