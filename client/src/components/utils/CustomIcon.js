import React from "react";
import Icon from "@ant-design/icons";

export default function CustomIcon({
  text = false,
  subText = false,
  foodIcon = null,
  inv = false,
  runningIcon = null,
  stepsIcon = null,
  workoutIcon = null,
  drumStickIcon = null,
  goalIcon = null,
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
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M31.335,47.127H3.242a3.242,3.242,0,0,0,0,6.483H31.335a3.242,3.242,0,0,0,0-6.483Zm1.081,8.644H2.161a1.081,1.081,0,0,0-1.081,1.081v1.081A4.322,4.322,0,0,0,5.4,62.255H29.174A4.322,4.322,0,0,0,33.5,57.933V56.852A1.081,1.081,0,0,0,32.416,55.772ZM3.96,44.966H30.617c2.335,0,3.689-2.965,2.352-5.124-2.713-4.384-8.687-7.835-15.68-7.842S4.322,35.458,1.609,39.841C.27,42,1.626,44.966,3.96,44.966ZM25.933,37.4a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,25.933,37.4Zm-8.644-2.161a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,17.289,35.242ZM8.644,37.4a1.081,1.081,0,1,1-1.081,1.081A1.081,1.081,0,0,1,8.644,37.4Z"
          transform="translate(7.5 -27.5)"
          fill={inv ? "#FFF" : "#4834D4"}
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
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M15.314,5.4a2.7,2.7,0,1,0-2.7-2.7A2.7,2.7,0,0,0,15.314,5.4ZM6.4,17.874l-.833,1.944H1.8a1.8,1.8,0,0,0,0,3.6H6.162a2.7,2.7,0,0,0,2.483-1.638l.495-1.155-.6-.355a5.361,5.361,0,0,1-2.139-2.4ZM21.62,12.611H19.141l-1.467-3A5.4,5.4,0,0,0,14.2,6.745l-4-1.19a5.382,5.382,0,0,0-4.551.965L3.408,8.232A1.8,1.8,0,0,0,5.6,11.091L7.835,9.379a1.753,1.753,0,0,1,1.423-.346l.828.246L7.977,14.2a3.613,3.613,0,0,0,1.481,4.522l4.784,2.825L12.7,26.485a1.8,1.8,0,1,0,3.438,1.076l1.781-5.69A2.714,2.714,0,0,0,16.7,18.809l-3.448-2.035,1.763-4.407L16.153,14.7a2.719,2.719,0,0,0,2.427,1.514h3.04a1.8,1.8,0,1,0,0-3.6Z"
          transform="translate(7.5 4.5)"
          fill={inv ? "#FFF" : "#4834D4"}
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
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M9.674,8.064h1.612V1.615H9.674a3.225,3.225,0,1,0,0,6.449ZM0,20.962a3.224,3.224,0,0,0,3.225,3.225H4.837V17.737H3.225A3.224,3.224,0,0,0,0,20.962Zm17-6.449a10.3,10.3,0,0,0-5.277,1.612,7.7,7.7,0,0,1-5.277,1.612v6.449l2.9.8a20.59,20.59,0,0,0,4.046.758,17.527,17.527,0,0,0,4.916-.312c5.516-1.185,7.486-3.809,7.486-6.087,0-3.225-4.241-4.837-8.794-4.837ZM24.76.365A17.508,17.508,0,0,0,19.843.052,20.626,20.626,0,0,0,15.8.81l-2.9.8V8.064a7.7,7.7,0,0,1,5.277,1.612,10.3,10.3,0,0,0,5.277,1.612c4.553,0,8.794-1.612,8.794-4.837,0-2.278-1.97-4.9-7.486-6.087Z"
          transform="translate(7.5 4.5)"
          fill={inv ? "#FFF" : "#4834D4"}
        />
      </g>
    </svg>
  );

  const WorkoutSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="58.221"
      height="45.255"
      viewBox="0 0 58.221 45.255"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="58.221"
          height="45.255"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M7.023,36.322H3.782a1.617,1.617,0,0,0-1.621,1.621v7.023H.54a.542.542,0,0,0-.54.54v3.242a.542.542,0,0,0,.54.54H2.161v7.023a1.617,1.617,0,0,0,1.621,1.621H7.023a1.617,1.617,0,0,0,1.621-1.621V37.943A1.617,1.617,0,0,0,7.023,36.322Zm35.658,8.644H41.06V37.943a1.617,1.617,0,0,0-1.621-1.621H36.2a1.617,1.617,0,0,0-1.621,1.621V56.312A1.617,1.617,0,0,0,36.2,57.933h3.242a1.617,1.617,0,0,0,1.621-1.621V49.289h1.621a.542.542,0,0,0,.54-.54V45.507A.542.542,0,0,0,42.681,44.966ZM30.8,32H27.554a1.617,1.617,0,0,0-1.621,1.621V44.966H17.289V33.621A1.617,1.617,0,0,0,15.668,32H12.426a1.617,1.617,0,0,0-1.621,1.621V60.634a1.617,1.617,0,0,0,1.621,1.621h3.242a1.617,1.617,0,0,0,1.621-1.621V49.289h8.644V60.634a1.617,1.617,0,0,0,1.621,1.621H30.8a1.617,1.617,0,0,0,1.621-1.621V33.621A1.617,1.617,0,0,0,30.8,32Z"
          transform="translate(7.5 -27.5)"
          fill={inv ? "#FFF" : "#4834D4"}
        />
      </g>
    </svg>
  );

  const DrumStickSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44.024"
      height="44.03"
      viewBox="0 0 44.024 44.03"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="44.024"
          height="44.03"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M26.262,2.814a9.606,9.606,0,0,0-13.577,0A10.86,10.86,0,0,0,9.1,10.889v4.866l-2.3,2.3a1.9,1.9,0,0,1-2.085.34,3.42,3.42,0,0,0-3.685,5.6,3.374,3.374,0,0,0,3.181.854,3.368,3.368,0,0,0,.856,3.18,3.421,3.421,0,0,0,5.6-3.685,1.9,1.9,0,0,1,.34-2.083l2.3-2.3h4.869a10.65,10.65,0,0,0,3.509-.567,6.071,6.071,0,0,1,7.358-9.517,9.535,9.535,0,0,0-2.785-7.061Z"
          transform="translate(7.47 4.5)"
          fill={inv ? "#FFF" : "#4834D4"}
        />
      </g>
    </svg>
  );

  const GoalSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45.255"
      height="45.255"
      viewBox="0 0 45.255 45.255"
    >
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          width="45.255"
          height="45.255"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feFlood floodOpacity="0.188" />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
        <path
          d="M15.127,8A15.127,15.127,0,1,0,30.255,23.127,15.127,15.127,0,0,0,15.127,8Zm0,26.351A11.224,11.224,0,1,1,26.351,23.127,11.217,11.217,0,0,1,15.127,34.351Zm0-19.031a7.808,7.808,0,1,0,7.808,7.808A7.808,7.808,0,0,0,15.127,15.32Zm0,11.712a3.9,3.9,0,1,1,3.9-3.9A3.908,3.908,0,0,1,15.127,27.031Z"
          transform="translate(7.5 -3.5)"
          fill={inv ? "#FFF" : "#4834D4"}
        />
      </g>
    </svg>
  );

  const FoodIcon = (props) => <Icon component={FoodSvg} {...props} />;
  const RunningIcon = (props) => <Icon component={RunningSvg} {...props} />;
  const StepsIcon = (props) => <Icon component={StepsSvg} {...props} />;
  const WorkoutIcon = (props) => <Icon component={WorkoutSvg} {...props} />;
  const DrumStickIcon = (props) => <Icon component={DrumStickSvg} {...props} />;
  const GoalIcon = (props) => <Icon component={GoalSvg} {...props} />;

  return (
    <div {...props}>
      {foodIcon && <FoodIcon />}
      {runningIcon && <RunningIcon />}
      {stepsIcon && <StepsIcon />}
      {workoutIcon && <WorkoutIcon />}
      {drumStickIcon && <DrumStickIcon />}
      {goalIcon && <GoalIcon />}
      {(text || subText) && (
        <div style={{ textAlign: "center", marginTop: "-0.6rem" }}>
          {text && <span style={textStyle}>{text} </span>}{" "}
          {subText && <span style={subTextStyle}>{subText}</span>}
        </div>
      )}
    </div>
  );
}
