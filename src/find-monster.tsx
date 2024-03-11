import { Action, ActionPanel, Detail, LaunchProps, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { ShowTitleTags } from "./../composables/show-title-tags";

interface ZeldaData {
    appearances: any;
    name: string;
    description: string;
}

interface Response {
    isLoading: boolean;
    error?: object;
    data?: object;
}

// We use this function in the for loop to retrieve data of multiple pages
const getMonsterData = (page: Number) => {
    const response = useFetch<Response>(`https://zelda.fanapis.com/api/monsters?limit=1000&page=` + page);
    return response.data;
};

// Call for additional Zelda Title Data
const getAppearanceData = (appearance: RequestInfo) => {
    const response = useFetch<Response>(appearance);

    if (response.data) {
        return response.data;
    } else {
        return { data: { name: "Loading additional information..." } };
    }
};

// Returns the main React component for a view command
export default function Command() {
    let combinedData: any[] = [];
    // Combine 9 pages of data into combinedData Array
    for (let i = 0; i < 11; i++) {
        let pageData = getMonsterData(i);
        if (pageData?.data) combinedData = [...combinedData, ...(pageData?.data as [])];
    }

    return (
        <List>
            {combinedData.map((info) => (
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

    // Display Detail page with detailed information about the dungeon
    function InfoDetail(props: { info: ZeldaData }) {
        let appearanceData = [];

        if (props?.info) {
            for (const zeldaTitle of props?.info?.appearances) {
                let response = getAppearanceData(zeldaTitle);
                appearanceData.push(response.data);
            }
        }

        const markdown = `
# ${props?.info?.name}

${props?.info?.description}
        `;

        return (
            <Detail
                markdown={markdown}
                navigationTitle={props?.info?.name}
                metadata={
                    <Detail.Metadata>
                        <Detail.Metadata.TagList title="Appears in">
                            {appearanceData.map((appeareance, index) => {
                                return ShowTitleTags(appeareance, index);
                            })}
                        </Detail.Metadata.TagList>
                    </Detail.Metadata>
                }
                actions={
                    <ActionPanel>
                        <Action.CopyToClipboard
                            title="Copy Description"
                            content={props?.info?.description}
                        ></Action.CopyToClipboard>
                    </ActionPanel>
                }
            />
        );
    }
}
