// import pgClient from "./pgclient"
// import sqls from "./sqls";

// const pgApiWrapper = async () => {
//     const { pgPool } = await pgClient();
//     const pgQuery = (text, params = {}) =>
//         pgPool.query(text, Object.values(params));

//     return {
//         questionList: async () => {
//             const pgResp = await pgQuery(sqls.questionsLatest);
//             return pgResp.rows;
//         },
//         answerList: async (questionIds) => {
//             const pgResp = await pgQuery(sqls.answersForQuestionIds, {
//                 $1: questionIds,
//             });
//             return questionIds.map((question_id) =>
//                 pgResp.rows.filter((row) => question_id === row.question_id));
//         },
//         // surveyInfo: async (survey_id) => {
//         //     const pgResp = await pgQuery(sqls.surveysFromIds, { $1: [survey_id]});
//         //     return survey_ids.map((survey_id) => pgResp.rows.find((row) => survey_id === row.id));
//         // },
//     };
// };
// export default pgApiWrapper;