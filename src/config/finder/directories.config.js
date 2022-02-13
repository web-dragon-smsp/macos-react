import {createDirectoryConfig} from "../../helpers/create-directory-config";


const airdrop = createDirectoryConfig({
    title: "AirDrop",
})

const recents = createDirectoryConfig({
    title: "Recents",
    items: [{
        name: "Readme.md",
        type: "file",
    }]
})


export const directoriesConfig = {
    airdrop,
    recents,
}
