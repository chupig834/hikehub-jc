/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/list/route";
exports.ids = ["app/api/list/route"];
exports.modules = {

/***/ "(rsc)/./app/api/list/route.ts":
/*!*******************************!*\
  !*** ./app/api/list/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_authOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/authOptions */ \"(rsc)/./utils/authOptions.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/list */ \"(rsc)/./models/list.ts\");\n\n\n\n\n// Get all user's packing lists\nasync function GET(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (session) {\n            const email = session.user.email;\n            await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)();\n            var userLists = [];\n            userLists = await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find({\n                owner: email\n            }, \"name\");\n            return Response.json(userLists, {\n                status: 200\n            });\n        } else {\n            return Response.json({\n                message: \"Not signed in\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        return Response.json({\n            message: \"Error creating packing list\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Create a new empty packing list\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        const searchParams = req.nextUrl.searchParams;\n        if (session) {\n            const email = session.user.email;\n            var name = searchParams.get('name') ?? \"New Packing List\";\n            var id;\n            try {\n                // Populate with body\n                const data = await req.json();\n                delete data._id;\n                delete data.owner;\n                delete data.visibility;\n                delete data.__v;\n                delete data.createdAt;\n                delete data.updatedAt;\n                const doc = new _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n                    owner: email,\n                    visibility: \"private\"\n                });\n                Object.assign(doc, data);\n                const updatedDoc = await doc.save();\n                id = updatedDoc._id;\n                name = updatedDoc.name;\n            } catch (error) {\n                // Create blank packing list\n                const newList = new _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n                    name,\n                    visibility: \"private\",\n                    owner: email,\n                    categories: []\n                });\n                await newList.save().then((doc)=>{\n                    id = doc._id;\n                });\n            }\n            return Response.json({\n                _id: id,\n                name\n            }, {\n                status: 201\n            });\n        } else {\n            return Response.json({\n                message: \"Not signed in\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        return Response.json({\n            message: \"Error creating packing list\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xpc3Qvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE2QztBQUNLO0FBRUg7QUFDZDtBQUVqQywrQkFBK0I7QUFDeEIsZUFBZUksSUFBSUMsR0FBWTtJQUNwQyxJQUFJO1FBQ0YsTUFBTUMsVUFBVSxNQUFNTiwyREFBZ0JBLENBQUNDLDJEQUFXQTtRQUVsRCxJQUFJSyxTQUFTO1lBQ1gsTUFBTUMsUUFBUUQsUUFBUUUsSUFBSSxDQUFDRCxLQUFLO1lBRWhDLE1BQU1MLDREQUFjQTtZQUVwQixJQUFJTyxZQUFZLEVBQUU7WUFFbEJBLFlBQVksTUFBTU4sb0RBQUlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsT0FBT0o7WUFBTSxHQUFHO1lBRTlDLE9BQU9LLFNBQVNDLElBQUksQ0FBQ0osV0FBVztnQkFBRUssUUFBUTtZQUFJO1FBQ2hELE9BQU87WUFDTCxPQUFPRixTQUFTQyxJQUFJLENBQ2xCO2dCQUFFRSxTQUFTO1lBQWdCLEdBQzNCO2dCQUFFRCxRQUFRO1lBQUk7UUFFbEI7SUFDRixFQUFFLE9BQU9FLE9BQU87UUFDZCxPQUFPSixTQUFTQyxJQUFJLENBQ2xCO1lBQUVFLFNBQVM7UUFBOEIsR0FDekM7WUFBRUQsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFQSxrQ0FBa0M7QUFDM0IsZUFBZUcsS0FBS1osR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sMkRBQWdCQSxDQUFDQywyREFBV0E7UUFDbEQsTUFBTWlCLGVBQWViLElBQUljLE9BQU8sQ0FBQ0QsWUFBWTtRQUU3QyxJQUFJWixTQUFTO1lBQ1gsTUFBTUMsUUFBUUQsUUFBUUUsSUFBSSxDQUFDRCxLQUFLO1lBQ2hDLElBQUlhLE9BQU9GLGFBQWFHLEdBQUcsQ0FBQyxXQUFXO1lBQ3ZDLElBQUlDO1lBRUosSUFBSTtnQkFDRixxQkFBcUI7Z0JBQ3JCLE1BQU1DLE9BQU8sTUFBTWxCLElBQUlRLElBQUk7Z0JBQzNCLE9BQU9VLEtBQUtDLEdBQUc7Z0JBQ2YsT0FBT0QsS0FBS1osS0FBSztnQkFDakIsT0FBT1ksS0FBS0UsVUFBVTtnQkFDdEIsT0FBT0YsS0FBS0csR0FBRztnQkFDZixPQUFPSCxLQUFLSSxTQUFTO2dCQUNyQixPQUFPSixLQUFLSyxTQUFTO2dCQUVyQixNQUFNQyxNQUFNLElBQUkxQixvREFBSUEsQ0FBQztvQkFDbkJRLE9BQU9KO29CQUNQa0IsWUFBWTtnQkFDZDtnQkFDQUssT0FBT0MsTUFBTSxDQUFDRixLQUFLTjtnQkFDbkIsTUFBTVMsYUFBYSxNQUFNSCxJQUFJSSxJQUFJO2dCQUNqQ1gsS0FBS1UsV0FBV1IsR0FBRztnQkFDbkJKLE9BQU9ZLFdBQVdaLElBQUk7WUFDeEIsRUFBRSxPQUFPSixPQUFPO2dCQUNkLDRCQUE0QjtnQkFDNUIsTUFBTWtCLFVBQVUsSUFBSS9CLG9EQUFJQSxDQUFDO29CQUN2QmlCO29CQUNBSyxZQUFZO29CQUNaZCxPQUFPSjtvQkFDUDRCLFlBQVksRUFBRTtnQkFDaEI7Z0JBRUEsTUFBTUQsUUFBUUQsSUFBSSxHQUFHRyxJQUFJLENBQUNQLENBQUFBO29CQUN4QlAsS0FBS08sSUFBSUwsR0FBRztnQkFDZDtZQUNGO1lBRUEsT0FBT1osU0FBU0MsSUFBSSxDQUNsQjtnQkFBRVcsS0FBS0Y7Z0JBQUlGO1lBQUssR0FDaEI7Z0JBQUVOLFFBQVE7WUFBSTtRQUVsQixPQUFPO1lBQ0wsT0FBT0YsU0FBU0MsSUFBSSxDQUNsQjtnQkFBRUUsU0FBUztZQUFnQixHQUMzQjtnQkFBRUQsUUFBUTtZQUFJO1FBRWxCO0lBQ0YsRUFBRSxPQUFPRSxPQUFPO1FBQ2QsT0FBT0osU0FBU0MsSUFBSSxDQUNsQjtZQUFFRSxTQUFTO1FBQThCLEdBQ3pDO1lBQUVELFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvYXBwL2FwaS9saXN0L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL3V0aWxzL2F1dGhPcHRpb25zXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgY29ubmVjdE1vbmdvREIgfSBmcm9tIFwiQC9saWIvbW9uZ29kYlwiO1xuaW1wb3J0IExpc3QgZnJvbSBcIkAvbW9kZWxzL2xpc3RcIjtcblxuLy8gR2V0IGFsbCB1c2VyJ3MgcGFja2luZyBsaXN0c1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG5cbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgY29uc3QgZW1haWwgPSBzZXNzaW9uLnVzZXIuZW1haWw7XG5cbiAgICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG5cbiAgICAgIHZhciB1c2VyTGlzdHMgPSBbXTtcblxuICAgICAgdXNlckxpc3RzID0gYXdhaXQgTGlzdC5maW5kKHsgb3duZXI6IGVtYWlsIH0sIFwibmFtZVwiKTtcblxuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24odXNlckxpc3RzLCB7IHN0YXR1czogMjAwIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiBcIk5vdCBzaWduZWQgaW5cIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiBcIkVycm9yIGNyZWF0aW5nIHBhY2tpbmcgbGlzdFwiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG5cbi8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwYWNraW5nIGxpc3RcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxLm5leHRVcmwuc2VhcmNoUGFyYW1zO1xuXG4gICAgaWYgKHNlc3Npb24pIHtcbiAgICAgIGNvbnN0IGVtYWlsID0gc2Vzc2lvbi51c2VyLmVtYWlsO1xuICAgICAgdmFyIG5hbWUgPSBzZWFyY2hQYXJhbXMuZ2V0KCduYW1lJykgPz8gXCJOZXcgUGFja2luZyBMaXN0XCI7XG4gICAgICB2YXIgaWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBvcHVsYXRlIHdpdGggYm9keVxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICAgICAgZGVsZXRlIGRhdGEuX2lkO1xuICAgICAgICBkZWxldGUgZGF0YS5vd25lcjtcbiAgICAgICAgZGVsZXRlIGRhdGEudmlzaWJpbGl0eTtcbiAgICAgICAgZGVsZXRlIGRhdGEuX192O1xuICAgICAgICBkZWxldGUgZGF0YS5jcmVhdGVkQXQ7XG4gICAgICAgIGRlbGV0ZSBkYXRhLnVwZGF0ZWRBdDtcblxuICAgICAgICBjb25zdCBkb2MgPSBuZXcgTGlzdCh7XG4gICAgICAgICAgb3duZXI6IGVtYWlsLFxuICAgICAgICAgIHZpc2liaWxpdHk6IFwicHJpdmF0ZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkb2MsIGRhdGEpO1xuICAgICAgICBjb25zdCB1cGRhdGVkRG9jID0gYXdhaXQgZG9jLnNhdmUoKTtcbiAgICAgICAgaWQgPSB1cGRhdGVkRG9jLl9pZDtcbiAgICAgICAgbmFtZSA9IHVwZGF0ZWREb2MubmFtZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIENyZWF0ZSBibGFuayBwYWNraW5nIGxpc3RcbiAgICAgICAgY29uc3QgbmV3TGlzdCA9IG5ldyBMaXN0KHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHZpc2liaWxpdHk6IFwicHJpdmF0ZVwiLFxuICAgICAgICAgIG93bmVyOiBlbWFpbCxcbiAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBuZXdMaXN0LnNhdmUoKS50aGVuKGRvYyA9PiB7XG4gICAgICAgICAgaWQgPSBkb2MuX2lkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgX2lkOiBpZCwgbmFtZSB9LFxuICAgICAgICB7IHN0YXR1czogMjAxIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiTm90IHNpZ25lZCBpblwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiRXJyb3IgY3JlYXRpbmcgcGFja2luZyBsaXN0XCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJjb25uZWN0TW9uZ29EQiIsIkxpc3QiLCJHRVQiLCJyZXEiLCJzZXNzaW9uIiwiZW1haWwiLCJ1c2VyIiwidXNlckxpc3RzIiwiZmluZCIsIm93bmVyIiwiUmVzcG9uc2UiLCJqc29uIiwic3RhdHVzIiwibWVzc2FnZSIsImVycm9yIiwiUE9TVCIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJuYW1lIiwiZ2V0IiwiaWQiLCJkYXRhIiwiX2lkIiwidmlzaWJpbGl0eSIsIl9fdiIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsImRvYyIsIk9iamVjdCIsImFzc2lnbiIsInVwZGF0ZWREb2MiLCJzYXZlIiwibmV3TGlzdCIsImNhdGVnb3JpZXMiLCJ0aGVuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/list/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectMongoDB: () => (/* binding */ connectMongoDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectMongoDB = async ()=>{\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGO_URI);\n    // console.log(\"Connected to MongoDB\");\n    } catch (error) {\n        console.log(\"Error connecting to MongoDB: \", error);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFekIsTUFBTUMsaUJBQWlCO0lBQzVCLElBQUk7UUFDRixNQUFNRCx1REFBZ0IsQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxTQUFTO0lBQzVDLHVDQUF1QztJQUN6QyxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ0Y7SUFDL0M7QUFDRixFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvbGliL21vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5leHBvcnQgY29uc3QgY29ubmVjdE1vbmdvREIgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT19VUkkpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIE1vbmdvREJcIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBjb25uZWN0aW5nIHRvIE1vbmdvREI6IFwiLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImNvbm5lY3RNb25nb0RCIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT19VUkkiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/list.ts":
/*!************************!*\
  !*** ./models/list.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst listSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    visibility: {\n        type: String,\n        enum: [\n            'private',\n            'public'\n        ],\n        required: true\n    },\n    owner: {\n        type: String,\n        required: true\n    },\n    coverImage: {\n        type: String,\n        required: true,\n        default: \"/images/hiking-banner1.jpg\"\n    },\n    categories: [\n        {\n            name: {\n                type: String,\n                required: true\n            }\n        }\n    ],\n    items: [\n        {\n            name: {\n                type: String\n            },\n            category: {\n                type: String\n            },\n            link: {\n                type: String\n            },\n            weight: {\n                type: Number\n            },\n            unit: {\n                type: String,\n                enum: [\n                    \"oz\",\n                    \"lb\",\n                    \"g\",\n                    \"kg\"\n                ]\n            },\n            quantity: {\n                type: Number\n            },\n            comment: {\n                type: String\n            }\n        }\n    ],\n    trailName: {\n        type: String\n    },\n    location: {\n        type: String\n    },\n    startDate: {\n        type: Date\n    },\n    endDate: {\n        type: Date\n    },\n    hikeLength: {\n        type: String\n    },\n    elevationGain: {\n        type: String\n    },\n    allTrailsLink: {\n        type: String\n    },\n    pubishDate: {\n        type: Date\n    }\n}, {\n    timestamps: true\n});\nconst List = mongoose__WEBPACK_IMPORTED_MODULE_0__.models?.lists || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"lists\", listSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvbGlzdC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkQ7QUFtQzNELE1BQU1HLGFBQWEsSUFBSUQsNENBQU1BLENBQWU7SUFDeENFLE1BQU07UUFDSkMsTUFBTUM7UUFDTkMsVUFBVTtJQUNaO0lBQ0FDLFlBQVk7UUFDVkgsTUFBTUM7UUFDTkcsTUFBTTtZQUFDO1lBQVc7U0FBUztRQUMzQkYsVUFBVTtJQUNaO0lBQ0FHLE9BQU87UUFDTEwsTUFBTUM7UUFDTkMsVUFBVTtJQUNaO0lBQ0FJLFlBQVk7UUFDVk4sTUFBTUM7UUFDTkMsVUFBVTtRQUNWSyxTQUFTO0lBQ1g7SUFDQUMsWUFBWTtRQUNWO1lBQ0VULE1BQU07Z0JBQUVDLE1BQU1DO2dCQUFRQyxVQUFVO1lBQUs7UUFDdkM7S0FDRDtJQUNETyxPQUFPO1FBQ0w7WUFDRVYsTUFBTTtnQkFBRUMsTUFBTUM7WUFBTztZQUNyQlMsVUFBVTtnQkFBQ1YsTUFBTUM7WUFBTztZQUN4QlUsTUFBTTtnQkFBRVgsTUFBTUM7WUFBTztZQUNyQlcsUUFBUTtnQkFBRVosTUFBTWE7WUFBTztZQUN2QkMsTUFBTTtnQkFBRWQsTUFBTUM7Z0JBQVFHLE1BQU07b0JBQUM7b0JBQU07b0JBQU07b0JBQUs7aUJBQUs7WUFBQztZQUNwRFcsVUFBVTtnQkFBRWYsTUFBTWE7WUFBTztZQUN6QkcsU0FBUztnQkFBRWhCLE1BQU1DO1lBQU87UUFDMUI7S0FDRDtJQUNEZ0IsV0FBVztRQUFDakIsTUFBTUM7SUFBTTtJQUN4QmlCLFVBQVU7UUFBQ2xCLE1BQU1DO0lBQU07SUFDdkJrQixXQUFXO1FBQUNuQixNQUFNb0I7SUFBSTtJQUN0QkMsU0FBUztRQUFDckIsTUFBTW9CO0lBQUk7SUFDcEJFLFlBQVk7UUFBQ3RCLE1BQU1DO0lBQU07SUFDekJzQixlQUFlO1FBQUN2QixNQUFNQztJQUFNO0lBQzVCdUIsZUFBZTtRQUFDeEIsTUFBTUM7SUFBTTtJQUM1QndCLFlBQVk7UUFBQ3pCLE1BQU1vQjtJQUFJO0FBQ3pCLEdBQ0E7SUFBRU0sWUFBWTtBQUFLO0FBR3JCLE1BQU1DLE9BQU8vQiw0Q0FBTUEsRUFBRWdDLFNBQWdDakMscURBQWMsQ0FBZSxTQUFTRztBQUMzRixpRUFBZTZCLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9tb2RlbHMvbGlzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgTW9kZWwsIG1vZGVscywgU2NoZW1hIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUl0ZW0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIGxpbms6IHN0cmluZztcbiAgd2VpZ2h0OiBudW1iZXI7XG4gIHVuaXQ6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgY29tbWVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYXRlZ29yeSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFja2luZ0xpc3Qge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZpc2liaWxpdHk6IHN0cmluZztcbiAgY292ZXJJbWFnZTogc3RyaW5nO1xuICBvd25lcjogc3RyaW5nO1xuICBjYXRlZ29yaWVzOiBJQ2F0ZWdvcnlbXTtcbiAgaXRlbXM6IElJdGVtW107XG4gIHRyYWlsTmFtZTogc3RyaW5nO1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICBzdGFydERhdGU6IERhdGU7XG4gIGVuZERhdGU6IERhdGU7XG4gIGhpa2VMZW5ndGg6IHN0cmluZztcbiAgZWxldmF0aW9uR2Fpbjogc3RyaW5nO1xuICBhbGxUcmFpbHNMaW5rOiBzdHJpbmc7XG4gIHB1YmlzaERhdGU6IERhdGU7XG59XG5cblxuY29uc3QgbGlzdFNjaGVtYSA9IG5ldyBTY2hlbWE8SVBhY2tpbmdMaXN0Pih7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICB2aXNpYmlsaXR5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBlbnVtOiBbJ3ByaXZhdGUnLCAncHVibGljJ10sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIG93bmVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGNvdmVySW1hZ2U6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgZGVmYXVsdDogXCIvaW1hZ2VzL2hpa2luZy1iYW5uZXIxLmpwZ1wiLCBcbiAgICB9LFxuICAgIGNhdGVnb3JpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICB9XG4gICAgXSxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBjYXRlZ29yeToge3R5cGU6IFN0cmluZyB9LFxuICAgICAgICBsaW5rOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgICB3ZWlnaHQ6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICAgIHVuaXQ6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJvelwiLCBcImxiXCIsIFwiZ1wiLCBcImtnXCJdIH0sXG4gICAgICAgIHF1YW50aXR5OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgICBjb21tZW50OiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgfVxuICAgIF0sXG4gICAgdHJhaWxOYW1lOiB7dHlwZTogU3RyaW5nfSxcbiAgICBsb2NhdGlvbjoge3R5cGU6IFN0cmluZ30sXG4gICAgc3RhcnREYXRlOiB7dHlwZTogRGF0ZX0sXG4gICAgZW5kRGF0ZToge3R5cGU6IERhdGV9LFxuICAgIGhpa2VMZW5ndGg6IHt0eXBlOiBTdHJpbmd9LFxuICAgIGVsZXZhdGlvbkdhaW46IHt0eXBlOiBTdHJpbmd9LFxuICAgIGFsbFRyYWlsc0xpbms6IHt0eXBlOiBTdHJpbmd9LFxuICAgIHB1YmlzaERhdGU6IHt0eXBlOiBEYXRlfVxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuY29uc3QgTGlzdCA9IG1vZGVscz8ubGlzdHMgYXMgTW9kZWw8SVBhY2tpbmdMaXN0PiB8fCBtb25nb29zZS5tb2RlbDxJUGFja2luZ0xpc3Q+KFwibGlzdHNcIiwgbGlzdFNjaGVtYSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwibW9kZWxzIiwiU2NoZW1hIiwibGlzdFNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ2aXNpYmlsaXR5IiwiZW51bSIsIm93bmVyIiwiY292ZXJJbWFnZSIsImRlZmF1bHQiLCJjYXRlZ29yaWVzIiwiaXRlbXMiLCJjYXRlZ29yeSIsImxpbmsiLCJ3ZWlnaHQiLCJOdW1iZXIiLCJ1bml0IiwicXVhbnRpdHkiLCJjb21tZW50IiwidHJhaWxOYW1lIiwibG9jYXRpb24iLCJzdGFydERhdGUiLCJEYXRlIiwiZW5kRGF0ZSIsImhpa2VMZW5ndGgiLCJlbGV2YXRpb25HYWluIiwiYWxsVHJhaWxzTGluayIsInB1YmlzaERhdGUiLCJ0aW1lc3RhbXBzIiwiTGlzdCIsImxpc3RzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/list.ts\n");

/***/ }),

/***/ "(rsc)/./models/user.ts":
/*!************************!*\
  !*** ./models/user.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            'Email is required'\n        ],\n        unique: true,\n        trim: true,\n        match: [\n            /.+\\@.+\\..+/,\n            'Please enter a valid email address'\n        ]\n    },\n    password: {\n        type: String\n    },\n    occupation: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.users || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"users\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvdXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkQ7QUFTM0QsTUFBTUcsYUFBYSxJQUFJRCw0Q0FBTUEsQ0FBUTtJQUNqQ0UsTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQUMsT0FBTztRQUNMSCxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0UsUUFBUTtRQUNSQyxNQUFNO1FBQ05DLE9BQU87WUFBQztZQUFjO1NBQXFDO0lBQzdEO0lBQ0FDLFVBQVU7UUFDUlAsTUFBTUM7SUFDUjtJQUNBTyxZQUFZO1FBQ1ZSLE1BQU1DO0lBQ1I7QUFDRixHQUNBO0lBQUVRLFlBQVk7QUFBSztBQUdyQixNQUFNQyxPQUFPZCw0Q0FBTUEsQ0FBQ2UsS0FBSyxJQUFvQmhCLHFEQUFjLENBQUMsU0FBU0c7QUFDckUsaUVBQWVZLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9tb2RlbHMvdXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgTW9kZWwsIG1vZGVscywgU2NoZW1hIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIge1xuICBuYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIG9jY3VwYXRpb246IHN0cmluZztcbn1cblxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsICdFbWFpbCBpcyByZXF1aXJlZCddLFxuICAgICAgdW5pcXVlOiB0cnVlLCBcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXRjaDogWy8uK1xcQC4rXFwuLisvLCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyddXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBvY2N1cGF0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuY29uc3QgVXNlciA9IG1vZGVscy51c2VycyBhcyBNb2RlbDxJVXNlcj4gfHwgbW9uZ29vc2UubW9kZWwoXCJ1c2Vyc1wiLCB1c2VyU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJtb2RlbHMiLCJTY2hlbWEiLCJ1c2VyU2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImVtYWlsIiwidW5pcXVlIiwidHJpbSIsIm1hdGNoIiwicGFzc3dvcmQiLCJvY2N1cGF0aW9uIiwidGltZXN0YW1wcyIsIlVzZXIiLCJ1c2VycyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/user.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2Froute&page=%2Fapi%2Flist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2Froute&page=%2Fapi%2Flist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_chupig_Documents_Project_HikeHub_app_api_list_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/list/route.ts */ \"(rsc)/./app/api/list/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/list/route\",\n        pathname: \"/api/list\",\n        filename: \"route\",\n        bundlePath: \"app/api/list/route\"\n    },\n    resolvedPagePath: \"/Users/chupig/Documents/Project/HikeHub/app/api/list/route.ts\",\n    nextConfigOutput,\n    userland: _Users_chupig_Documents_Project_HikeHub_app_api_list_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsaXN0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZsaXN0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbGlzdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNhO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvYXBwL2FwaS9saXN0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9saXN0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbGlzdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbGlzdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9hcHAvYXBpL2xpc3Qvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2Froute&page=%2Fapi%2Flist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./utils/authOptions.ts":
/*!******************************!*\
  !*** ./utils/authOptions.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/user */ \"(rsc)/./models/user.ts\");\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {},\n            async authorize (credentials) {\n                const { email, password } = credentials;\n                try {\n                    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectMongoDB)();\n                    const user = await _models_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n                        email\n                    });\n                    if (!user || !user.password) return null;\n                    const passwordMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.password);\n                    if (!passwordMatch) {\n                        return null;\n                    }\n                    return {\n                        id: \"1\",\n                        name: user.name,\n                        email: user.email\n                    };\n                } catch (error) {\n                    console.log(error);\n                }\n            }\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    pages: {\n        signIn: \"/\"\n    },\n    callbacks: {\n        async signIn ({ user, account }) {\n            try {\n                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectMongoDB)();\n                const existingUser = await _models_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n                    email: user.email\n                });\n                if (!existingUser) {\n                    await _models_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].insertOne({\n                        name: user.name,\n                        email: user.email\n                    });\n                }\n                return true;\n            } catch (error) {\n                console.log(\"Error saving Google user:\", error);\n                return false;\n            }\n        },\n        jwt ({ token, trigger, session }) {\n            // Allow name to be updated\n            if (trigger === \"update\" && session?.name) {\n                token.name = session.name;\n            }\n            return token;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi91dGlscy9hdXRoT3B0aW9ucy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDa0U7QUFDVjtBQUMxQjtBQUNpQjtBQUNkO0FBRTFCLE1BQU1LLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1ROLDJFQUFtQkEsQ0FBQztZQUNsQk8sTUFBTTtZQUNOQyxhQUFhLENBQUM7WUFDZCxNQUFNQyxXQUFVRCxXQUFXO2dCQUN6QixNQUFNLEVBQUVFLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUdIO2dCQUM1QixJQUFJO29CQUNGLE1BQU1MLDREQUFjQTtvQkFFcEIsTUFBTVMsT0FBTyxNQUFNUixvREFBSUEsQ0FBQ1MsT0FBTyxDQUFDO3dCQUFFSDtvQkFBTTtvQkFFeEMsSUFBSSxDQUFDRSxRQUFRLENBQUNBLEtBQUtELFFBQVEsRUFDekIsT0FBTztvQkFFVCxNQUFNRyxnQkFBZ0IsTUFBTVosd0RBQWMsQ0FBQ1MsVUFBVUMsS0FBS0QsUUFBUTtvQkFFbEUsSUFBSSxDQUFDRyxlQUFlO3dCQUNsQixPQUFPO29CQUNUO29CQUNBLE9BQU87d0JBQ0xFLElBQUk7d0JBQ0pULE1BQU1LLEtBQUtMLElBQUk7d0JBQ2ZHLE9BQU9FLEtBQUtGLEtBQUs7b0JBQ25CO2dCQUVGLEVBQUUsT0FBT08sT0FBTztvQkFDZEMsUUFBUUMsR0FBRyxDQUFDRjtnQkFDZDtZQUNGO1FBQ0Y7UUFDQWhCLHNFQUFjQSxDQUFDO1lBQ2JtQixVQUFVQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtZQUN0Q0MsY0FBY0gsUUFBUUMsR0FBRyxDQUFDRyxvQkFBb0I7UUFDaEQ7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7SUFFWjtJQUNBQyxRQUFRUCxRQUFRQyxHQUFHLENBQUNPLGVBQWU7SUFDbkNDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVCxNQUFNRCxRQUFPLEVBQUVuQixJQUFJLEVBQUVxQixPQUFPLEVBQUU7WUFDNUIsSUFBSTtnQkFDRixNQUFNOUIsNERBQWNBO2dCQUNwQixNQUFNK0IsZUFBZSxNQUFNOUIsb0RBQUlBLENBQUNTLE9BQU8sQ0FBQztvQkFBRUgsT0FBT0UsS0FBS0YsS0FBSztnQkFBQztnQkFFNUQsSUFBSSxDQUFDd0IsY0FBYztvQkFDakIsTUFBTTlCLG9EQUFJQSxDQUFDK0IsU0FBUyxDQUFDO3dCQUNuQjVCLE1BQU1LLEtBQUtMLElBQUk7d0JBQ2ZHLE9BQU9FLEtBQUtGLEtBQUs7b0JBQ25CO2dCQUNGO2dCQUNBLE9BQU87WUFDVCxFQUFFLE9BQU9PLE9BQU87Z0JBQ2RDLFFBQVFDLEdBQUcsQ0FBQyw2QkFBNkJGO2dCQUN6QyxPQUFPO1lBQ1Q7UUFDRjtRQUNBbUIsS0FBSSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRVosT0FBTyxFQUFFO1lBQzdCLDJCQUEyQjtZQUMzQixJQUFJWSxZQUFZLFlBQVlaLFNBQVNuQixNQUFNO2dCQUN6QzhCLE1BQU05QixJQUFJLEdBQUdtQixRQUFRbkIsSUFBSTtZQUMzQjtZQUNBLE9BQU84QjtRQUNUO0lBQ0Y7QUFDRixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvdXRpbHMvYXV0aE9wdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgeyBjb25uZWN0TW9uZ29EQiB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiQC9tb2RlbHMvdXNlclwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge30sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGNyZWRlbnRpYWxzIGFzIHsgZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG5cbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XG5cbiAgICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgIGNvbnN0IHBhc3N3b3JkTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG5cbiAgICAgICAgICBpZiAoIXBhc3N3b3JkTWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IFwiMVwiLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxuICAgIH0pLFxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgLy8gbWF4QWdlOiA1ICogNjAsIC8vIDUgbWludXRlc1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL1wiXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQgfSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY29ubmVjdE1vbmdvREIoKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHVzZXIuZW1haWwgfSk7XG5cbiAgICAgICAgaWYgKCFleGlzdGluZ1VzZXIpIHtcbiAgICAgICAgICBhd2FpdCBVc2VyLmluc2VydE9uZSh7XG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNhdmluZyBHb29nbGUgdXNlcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBqd3QoeyB0b2tlbiwgdHJpZ2dlciwgc2Vzc2lvbiB9KSB7XG4gICAgICAvLyBBbGxvdyBuYW1lIHRvIGJlIHVwZGF0ZWRcbiAgICAgIGlmICh0cmlnZ2VyID09PSBcInVwZGF0ZVwiICYmIHNlc3Npb24/Lm5hbWUpIHtcbiAgICAgICAgdG9rZW4ubmFtZSA9IHNlc3Npb24ubmFtZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJHb29nbGVQcm92aWRlciIsImJjcnlwdCIsImNvbm5lY3RNb25nb0RCIiwiVXNlciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiYXV0aG9yaXplIiwiZW1haWwiLCJwYXNzd29yZCIsInVzZXIiLCJmaW5kT25lIiwicGFzc3dvcmRNYXRjaCIsImNvbXBhcmUiLCJpZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsInNlc3Npb24iLCJzdHJhdGVneSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiYWNjb3VudCIsImV4aXN0aW5nVXNlciIsImluc2VydE9uZSIsImp3dCIsInRva2VuIiwidHJpZ2dlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./utils/authOptions.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2Froute&page=%2Fapi%2Flist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();