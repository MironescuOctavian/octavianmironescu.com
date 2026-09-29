interface Props {
  date: Date
}

export default function FormattedDate(props: Props) {
  return (
    <time datetime={props.date.toISOString()}>
      {props.date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}
    </time>
  )
}
