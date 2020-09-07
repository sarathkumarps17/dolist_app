import React from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Select from "../elements/Select";

function EditItem({
  className,
  handleChange,
  formData,
  priority_options,
  isDone_options,
  handleSubmit,
  children,
}) {
  return (
    <div className={className}>
      <h1>Add Details</h1>
      <form className={`${className}-form`} onSubmit={handleSubmit}>
        <Input
          required
          placeholder="Heading"
          className={`${className}-heading`}
          name="heading"
          type="text"
          handleChange={handleChange}
          value={formData.heading}
        />
        <Input
          required
          placeholder="content"
          className={`${className}-content`}
          name="content"
          type="text"
          handleChange={handleChange}
          value={formData.content}
        />
        <Select
          label="Select Priority"
          name="priority"
          className={`${className}-selector`}
          value={formData.priority}
          onChange={handleChange}
          options={priority_options}
        ></Select>
        {isDone_options && (
          <Select
            label="Status"
            name="isDone"
            className={`${className}-selector`}
            value={formData.isDone}
            onChange={handleChange}
            options={isDone_options}
          ></Select>
        )}

        <div className={`${className}-btn-container`}>
          <Button
            className={`${className}-btn ${className}-btn-dark ${className}-btn-update ${className}-btn-add`}
            children={children}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default EditItem;
