import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import de from "javascript-time-ago/locale/de"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(de)

const timeago = new TimeAgo(["en-US", "de-DE"])

export default timeago
