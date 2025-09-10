import { DatePicker, UploadFile,TextInput } from "@upyog/digit-ui-react-components";
import React, { act } from "react";

export const configEWApproverApplication = ({
  t,
  action,
  approvers,
  selectedDate,
  setSelectedDate,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
}) => {
  console.log("action", action)
  const todayDate = new Date().toISOString().split("T")[0];
  console.log("todayedsta ::", todayDate)

  return {
    label: {
      heading: `WF_${action?.action}_APPLICATION`,
      submit: `WF_${businessService}_${action?.action}`,
      cancel: "ES_PTR_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          action?.state === "COMPLETIONPENDING" ? (
            {
              label: t("EW_PICKUP_DATE"),
              type: "date",
              isMandatory: true,
              populators: {
                name: "date",
                min: new Date().toISOString().split('T')[0],
                max: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              }
            }) : "null",


          action?.state === "REQUESTCOMPLETED" ? (

            {
              label: t("ES_EW_ACTION_TRANSACTION_ID"),
              type: "text",
              isMandatory: true,
              populators: {
                name: "transactionId",
              },
            }) : "null",
          action?.state === "REQUESTCOMPLETED" ? (

            {
              label: t("ES_EW_ACTION_FINALAMOUNT"),
              type: "text",
              isMandatory: true,
              populators: {
                name: "finalAmount",
              },
            }) : "null",
          {
            label: t("ES_EW_ACTION_COMMENTS"),
            type: "textarea",
            isMandatory :"true",
            populators: {
              name: "comments",
            },
          },

          {
            label: `${t("ES_EW_PHOTO")}${action.docUploadRequired ? " *" : ""}`,
            populators: (
              <UploadFile
                id={"workflow-doc"}
                onUpload={selectFile}
                onDelete={() => {
                  setUploadedFile(null);
                }}
                showHint={true}
                hintText={t("EW_ATTACH_RESTRICTIONS_SIZE")}
                message={uploadedFile ? `1 ${t(`ES_EW_ACTION_FILEUPLOADED`)}` : t(`ES_EW_ACTION_NO_FILEUPLOADED`)}
              />
            ),
          },
        ],
      },
    ],
  };
};