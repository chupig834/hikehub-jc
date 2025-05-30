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
exports.id = "app/api/list/[id]/route";
exports.ids = ["app/api/list/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/list/[id]/route.ts":
/*!************************************!*\
  !*** ./app/api/list/[id]/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_authOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/authOptions */ \"(rsc)/./utils/authOptions.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/list */ \"(rsc)/./models/list.ts\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n// Get packing list by id\nasync function GET(req, { params }) {\n    try {\n        const { id } = await params;\n        // Allow public lists to be viewed without session\n        let doc = await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n            _id: id,\n            visibility: \"public\"\n        });\n        if (doc) return Response.json(doc, {\n            status: 200\n        });\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (session) {\n            const email = session.user.email;\n            await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)();\n            doc = await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                owner: email,\n                _id: id\n            });\n            if (!doc) {\n                return Response.json({\n                    message: \"Could not find list\"\n                }, {\n                    status: 404\n                });\n            }\n            return Response.json(doc, {\n                status: 200\n            });\n        } else {\n            return Response.json({\n                message: \"Could not find list\"\n            }, {\n                status: 404\n            });\n        }\n    } catch (error) {\n        if (error instanceof mongoose__WEBPACK_IMPORTED_MODULE_4__.Error.CastError) {\n            return Response.json({\n                message: \"Invalid id\"\n            }, {\n                status: 400\n            });\n        }\n        return Response.json({\n            message: \"Error getting packing list\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Update packing list by id\nasync function PUT(req, { params }) {\n    try {\n        const { id } = await params;\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (session) {\n            const email = session.user.email;\n            const data = await req.json();\n            await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)();\n            const doc = await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                _id: id,\n                owner: email\n            });\n            if (!doc) {\n                return Response.json({\n                    message: \"Could not find list\"\n                }, {\n                    status: 404\n                });\n            }\n            delete data._id; // Don't allow user to change _id\n            Object.assign(doc, data);\n            const updatedDoc = await doc.save();\n            return Response.json(updatedDoc, {\n                status: 200\n            });\n        } else {\n            return Response.json({\n                message: \"Not signed in\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        if (error instanceof mongoose__WEBPACK_IMPORTED_MODULE_4__.Error.CastError) {\n            return Response.json({\n                message: \"Invalid id\"\n            }, {\n                status: 400\n            });\n        }\n        return Response.json({\n            message: \"Error creating packing list\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Delete packing list by id\nasync function DELETE(req, { params }) {\n    try {\n        const { id } = await params;\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (session) {\n            const email = session.user.email;\n            await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)();\n            const doc = await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                _id: id,\n                owner: email\n            });\n            if (!doc) {\n                return Response.json({\n                    message: \"Could not find list\"\n                }, {\n                    status: 404\n                });\n            }\n            await _models_list__WEBPACK_IMPORTED_MODULE_3__[\"default\"].deleteOne({\n                _id: id,\n                owner: email\n            });\n            return Response.json({\n                message: \"Packing list deleted successfully\"\n            }, {\n                status: 200\n            });\n        } else {\n            return Response.json({\n                message: \"Not signed in\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        if (error instanceof mongoose__WEBPACK_IMPORTED_MODULE_4__.Error.CastError) {\n            return Response.json({\n                message: \"Invalid id\"\n            }, {\n                status: 400\n            });\n        }\n        console.log(error);\n        return Response.json({\n            message: \"Error deleting packing list\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU9SLFNBQVNDLElBQUksQ0FDbEI7WUFBRU0sU0FBUztRQUE4QixHQUN6QztZQUFFTCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2NodXBpZy9Eb2N1bWVudHMvUHJvamVjdC9IaWtlSHViL2FwcC9hcGkvbGlzdC9baWRdL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL3V0aWxzL2F1dGhPcHRpb25zXCI7XG5pbXBvcnQgeyBjb25uZWN0TW9uZ29EQiB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiQC9tb2RlbHMvbGlzdFwiO1xuaW1wb3J0IHsgRXJyb3IgfSBmcm9tIFwibW9uZ29vc2VcIjtcblxuLy8gR2V0IHBhY2tpbmcgbGlzdCBieSBpZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IFJlcXVlc3QsIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcGFyYW1zO1xuXG4gICAgLy8gQWxsb3cgcHVibGljIGxpc3RzIHRvIGJlIHZpZXdlZCB3aXRob3V0IHNlc3Npb25cbiAgICBsZXQgZG9jID0gYXdhaXQgTGlzdC5maW5kT25lKHtfaWQ6IGlkLCB2aXNpYmlsaXR5OiBcInB1YmxpY1wifSk7XG4gICAgaWYgKGRvYylcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKGRvYywgeyBzdGF0dXM6IDIwMCB9KTtcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgY29uc3QgZW1haWwgPSBzZXNzaW9uLnVzZXIuZW1haWw7XG5cbiAgICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG5cbiAgICAgIGRvYyA9IGF3YWl0IExpc3QuZmluZE9uZSh7IG93bmVyOiBlbWFpbCwgX2lkOiBpZCB9KTtcblxuICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBtZXNzYWdlOiBcIkNvdWxkIG5vdCBmaW5kIGxpc3RcIiB9LFxuICAgICAgICAgIHsgc3RhdHVzOiA0MDQgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihkb2MsIHsgc3RhdHVzOiAyMDAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiQ291bGQgbm90IGZpbmQgbGlzdFwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IuQ2FzdEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiBcIkludmFsaWQgaWRcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiRXJyb3IgZ2V0dGluZyBwYWNraW5nIGxpc3RcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG4vLyBVcGRhdGUgcGFja2luZyBsaXN0IGJ5IGlkXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcTogUmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBwYXJhbXM7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuXG4gICAgaWYgKHNlc3Npb24pIHtcbiAgICAgIGNvbnN0IGVtYWlsID0gc2Vzc2lvbi51c2VyLmVtYWlsO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG4gICAgICBjb25zdCBkb2MgPSBhd2FpdCBMaXN0LmZpbmRPbmUoeyBfaWQ6IGlkLCBvd25lcjogZW1haWwgfSk7XG5cbiAgICAgIGlmICghZG9jKSB7XG4gICAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgbWVzc2FnZTogXCJDb3VsZCBub3QgZmluZCBsaXN0XCIgfSxcbiAgICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIGRhdGEuX2lkOyAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIGNoYW5nZSBfaWRcbiAgICAgIE9iamVjdC5hc3NpZ24oZG9jLCBkYXRhKTtcbiAgICAgIGNvbnN0IHVwZGF0ZWREb2MgPSBhd2FpdCBkb2Muc2F2ZSgpO1xuXG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICAgICAgdXBkYXRlZERvYyxcbiAgICAgICAgeyBzdGF0dXM6IDIwMCB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiTm90IHNpZ25lZCBpblwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IuQ2FzdEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiBcIkludmFsaWQgaWRcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiRXJyb3IgY3JlYXRpbmcgcGFja2luZyBsaXN0XCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuLy8gRGVsZXRlIHBhY2tpbmcgbGlzdCBieSBpZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXE6IFJlcXVlc3QsIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcGFyYW1zO1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcblxuICAgIGlmIChzZXNzaW9uKSB7XG4gICAgICBjb25zdCBlbWFpbCA9IHNlc3Npb24udXNlci5lbWFpbDtcblxuICAgICAgYXdhaXQgY29ubmVjdE1vbmdvREIoKTtcbiAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IExpc3QuZmluZE9uZSh7IF9pZDogaWQsIG93bmVyOiBlbWFpbCB9KTtcblxuICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBtZXNzYWdlOiBcIkNvdWxkIG5vdCBmaW5kIGxpc3RcIiB9LFxuICAgICAgICAgIHsgc3RhdHVzOiA0MDQgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBMaXN0LmRlbGV0ZU9uZSh7X2lkOiBpZCwgb3duZXI6IGVtYWlsfSk7XG5cbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiUGFja2luZyBsaXN0IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCJ9LFxuICAgICAgICB7IHN0YXR1czogMjAwIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgbWVzc2FnZTogXCJOb3Qgc2lnbmVkIGluXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvci5DYXN0RXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiSW52YWxpZCBpZFwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhlcnJvcilcblxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiBcIkVycm9yIGRlbGV0aW5nIHBhY2tpbmcgbGlzdFwiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiY29ubmVjdE1vbmdvREIiLCJMaXN0IiwiRXJyb3IiLCJHRVQiLCJyZXEiLCJwYXJhbXMiLCJpZCIsImRvYyIsImZpbmRPbmUiLCJfaWQiLCJ2aXNpYmlsaXR5IiwiUmVzcG9uc2UiLCJqc29uIiwic3RhdHVzIiwic2Vzc2lvbiIsImVtYWlsIiwidXNlciIsIm93bmVyIiwibWVzc2FnZSIsImVycm9yIiwiQ2FzdEVycm9yIiwiUFVUIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInVwZGF0ZWREb2MiLCJzYXZlIiwiREVMRVRFIiwiZGVsZXRlT25lIiwiY29uc29sZSIsImxvZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/list/[id]/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2F%5Bid%5D%2Froute&page=%2Fapi%2Flist%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2F%5Bid%5D%2Froute&page=%2Fapi%2Flist%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_chupig_Documents_Project_HikeHub_app_api_list_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/list/[id]/route.ts */ \"(rsc)/./app/api/list/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/list/[id]/route\",\n        pathname: \"/api/list/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/list/[id]/route\"\n    },\n    resolvedPagePath: \"/Users/chupig/Documents/Project/HikeHub/app/api/list/[id]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_chupig_Documents_Project_HikeHub_app_api_list_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsaXN0JTJGJTVCaWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmxpc3QlMkYlNUJpZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmxpc3QlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2NodXBpZy9Eb2N1bWVudHMvUHJvamVjdC9IaWtlSHViL2FwcC9hcGkvbGlzdC9baWRdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9saXN0L1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9saXN0L1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2xpc3QvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9hcHAvYXBpL2xpc3QvW2lkXS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2F%5Bid%5D%2Froute&page=%2Fapi%2Flist%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flist%2F%5Bid%5D%2Froute&page=%2Fapi%2Flist%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flist%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();