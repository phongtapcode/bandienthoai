import './Checkbox.scss';
import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = ['Apple', 'Orange'];

const CheckboxComponent = ({dataCategory,onCheckboxChange}) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = dataCategory.category.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < dataCategory.category.length;

  const handleOnChange = (list) => {
    setCheckedList(list);
    onCheckboxChange({filter: dataCategory.filter,listFilter: list});
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? dataCategory.category : []);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} className='checkall'>
        {dataCategory.title}
      </Checkbox>
        
      <CheckboxGroup options={dataCategory.category} value={checkedList} onChange={handleOnChange} />
    </>
  );
};
export default CheckboxComponent;