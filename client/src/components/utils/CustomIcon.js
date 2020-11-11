import React from "react";
import Icon from "@ant-design/icons";

export default function CustomIcon({
  text = "1000",
  subText = "kcal",
  foodIcon = null,
  runningIcon = null,
  stepsIcon = null,
  height = "1rem",
  ...props
}) {
  const textStyle = {
    fontSize: "20px",
    fontWeight: "800",
  };

  const subTextStyle = {
    fontSize: "14px",
    fontWeight: "800",
  };

  const FoodSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="50"
      viewBox="0 0 49.577 45.255"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="50"
          height="46"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood flood-opacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M31.335,47.127H3.242a3.242,3.242,0,0,0,0,6.483H31.335a3.242,3.242,0,0,0,0-6.483Zm1.081,8.644H2.161a1.081,1.081,0,0,0-1.081,1.081v1.081A4.322,4.322,0,0,0,5.4,62.255H29.174A4.322,4.322,0,0,0,33.5,57.933V56.852A1.081,1.081,0,0,0,32.416,55.772ZM3.96,44.966H30.617c2.335,0,3.689-2.965,2.352-5.124-2.713-4.384-8.687-7.835-15.68-7.842S4.322,35.458,1.609,39.841C.27,42,1.626,44.966,3.96,44.966ZM25.933,37.4a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,25.933,37.4Zm-8.644-2.161a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,17.289,35.242ZM8.644,37.4a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,8.644,37.4Z"
          transform="translate(7.5 -27.5)"
          fill="#4834D4"
        />
      </g>
    </svg>
  );

  const RunningSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="50"
      viewBox="0 0 38.421 43.825"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="50"
          height="57"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood flood-opacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M15.314,5.4a2.7,2.7,0,1,0-2.7-2.7A2.7,2.7,0,0,0,15.314,5.4ZM6.4,17.874l-.833,1.944H1.8a1.8,1.8,0,0,0,0,3.6H6.162a2.7,2.7,0,0,0,2.483-1.638l.495-1.155-.6-.355a5.361,5.361,0,0,1-2.139-2.4ZM21.62,12.611H19.141l-1.467-3A5.4,5.4,0,0,0,14.2,6.745l-4-1.19a5.382,5.382,0,0,0-4.551.965L3.408,8.232A1.8,1.8,0,0,0,5.6,11.091L7.835,9.379a1.753,1.753,0,0,1,1.423-.346l.828.246L7.977,14.2a3.613,3.613,0,0,0,1.481,4.522l4.784,2.825L12.7,26.485a1.8,1.8,0,1,0,3.438,1.076l1.781-5.69A2.714,2.714,0,0,0,16.7,18.809l-3.448-2.035,1.763-4.407L16.153,14.7a2.719,2.719,0,0,0,2.427,1.514h3.04a1.8,1.8,0,1,0,0-3.6Z"
          transform="translate(7.5 4.5)"
          fill="#4834d4"
        />
      </g>
    </svg>
  );

  const StepsSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="57"
      height="50"
      viewBox="0 0 47.246 40.797"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="50"
          height="43"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood flood-opacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M9.674,8.064h1.612V1.615H9.674a3.225,3.225,0,1,0,0,6.449ZM0,20.962a3.224,3.224,0,0,0,3.225,3.225H4.837V17.737H3.225A3.224,3.224,0,0,0,0,20.962Zm17-6.449a10.3,10.3,0,0,0-5.277,1.612,7.7,7.7,0,0,1-5.277,1.612v6.449l2.9.8a20.59,20.59,0,0,0,4.046.758,17.527,17.527,0,0,0,4.916-.312c5.516-1.185,7.486-3.809,7.486-6.087,0-3.225-4.241-4.837-8.794-4.837ZM24.76.365A17.508,17.508,0,0,0,19.843.052,20.626,20.626,0,0,0,15.8.81l-2.9.8V8.064a7.7,7.7,0,0,1,5.277,1.612,10.3,10.3,0,0,0,5.277,1.612c4.553,0,8.794-1.612,8.794-4.837,0-2.278-1.97-4.9-7.486-6.087Z"
          transform="translate(7.5 4.5)"
          fill="#4834d4"
        />
      </g>
    </svg>
  );

  const FoodIcon = (props) => <Icon component={FoodSvg} {...props} />;
  const RunningIcon = (props) => <Icon component={RunningSvg} {...props} />;
  const StepsIcon = (props) => <Icon component={StepsSvg} {...props} />;

  return (
    <div {...props}>
      {foodIcon && <FoodIcon />}
      {runningIcon && <RunningIcon />}
      {stepsIcon && <StepsIcon />}
      <div style={{ textAlign: "center", marginTop: "-0.6rem" }}>
        <span style={textStyle}>{text} </span>{" "}
        <span style={subTextStyle}>{subText}</span>
      </div>
    </div>
  );
}
