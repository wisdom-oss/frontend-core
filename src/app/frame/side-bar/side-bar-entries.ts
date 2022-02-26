/** Nullable string. */
type nullString = string | null;
/** [identifier name, icon name, path] */
type SideBarEntry = [string, nullString, nullString];

type SideBarLabel = [string, nullString, SideBarEntryLvl1[]];
type SideBarEntryLvl1 = [string, nullString, nullString, SideBarEntryLvl2[]] | SideBarEntry;
type SideBarEntryLvl2 = [string, nullString, nullString, SideBarEntryLvl3[]] | SideBarEntry;
type SideBarEntryLvl3 = SideBarEntry;

/**
 * This type describes the nested data structure of the sidebar.
 *
 * This type consists of nested arrays.
 * The first layer are for labels.
 * All the following are entries with a name, that may be translated if give a
 * translation key, a possible icon name from {@link https://ionic.io/ionicons},
 * a path to follow and possible children.
 */
export type SideBarEntries = SideBarLabel[];
