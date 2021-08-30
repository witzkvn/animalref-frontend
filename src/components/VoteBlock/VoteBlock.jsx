import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import "./VoteBlock.scss";
import { convertNumber } from "../../helper/functions/convertNumber";

const VoteBlock = ({ checked, rating }) => {
  return (
    <div className="VoteBlock">
      <CustomButton level="primary" disabled={!checked}>
        <IoCaretUp />
      </CustomButton>
      <div className="VoteBlock__rating">
        {rating ? convertNumber(rating) : 0}
      </div>
      <CustomButton level="primary" disabled={!checked}>
        <IoCaretDown />
      </CustomButton>
    </div>
  );
};

export default VoteBlock;
