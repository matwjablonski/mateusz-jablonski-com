import {createClient, EntryCollection} from 'contentful';
import {Items} from "./models/entries.model";

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDA_TOKEN

const client = createClient({
  space,
  accessToken,
})

async function fetchEntries(context): Promise<Items> {
  const entries: EntryCollection<Items> = await client.getEntries(context)

  if (entries.items) {
    return entries.items
  }

  return null
}

export { fetchEntries }
