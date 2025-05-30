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
exports.id = "app/api/gear/route";
exports.ids = ["app/api/gear/route"];
exports.modules = {

/***/ "(rsc)/./app/api/gear/route.ts":
/*!*******************************!*\
  !*** ./app/api/gear/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_authOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/authOptions */ \"(rsc)/./utils/authOptions.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_gear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/gear */ \"(rsc)/./models/gear.ts\");\n\n\n\n\n//import { NextResponse } from \"next/server\";\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (!session) {\n            return Response.json({\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { name, link, weight, unit, comment } = await req.json(); // Get gear details\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)(); // Connect to the database\n        const newGear = new _models_gear__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n            name,\n            link,\n            weight,\n            unit,\n            comment,\n            email: session.user.email\n        });\n        const newDoc = await newGear.save(); // Save to database\n        return Response.json(newDoc, {\n            status: 201\n        });\n    } catch (error) {\n        return Response.json({\n            message: \"An error occurred while adding gear.\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET(req) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_utils_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n    if (!session) {\n        return Response.json({\n            message: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.connectMongoDB)();\n        const userGear = await _models_gear__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find({\n            email: session.user.email\n        });\n        return Response.json(userGear, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error fetching gear:\", error);\n        return Response.json({\n            message: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n} // export async function DELETE(req: Request) {\n //   try {\n //     const session = await getServerSession(authOptions);\n //     if (!session) {\n //       return Response.json({ message: \"Unauthorized\" }, { status: 401 });\n //     }\n //     const { id } = await req.json(); // Extract the ID from request body\n //     await connectMongoDB(); // Connect to the database\n //     const gearItem = await Gear.findOne({ _id: id, email: session.user.email });\n //     if (!gearItem) {\n //       return Response.json({ message: \"Item not found or unauthorized\" }, { status: 404 });\n //     }\n //     await Gear.deleteOne({ _id: id }); // Delete the item\n //     return Response.json({ message: \"Gear deleted successfully\" }, { status: 200 });\n //   } catch (error) {\n //     return Response.json(\n //       { message: \"An error occurred while deleting gear.\" },\n //       { status: 500 }\n //     );\n //   }\n // }\n // GET METHOD TO FETCH USER'S GEAR\n // export async function GET(req: Request) {\n //   try {\n //     const { searchParams } = new URL(req.url);\n //     const email = searchParams.get(\"email\");\n //     if (!email) {\n //       return NextResponse.json(\n //         { message: \"Email is required.\" },\n //         { status: 400 }\n //       );\n //     }\n //     await connectMongoDB();\n //     const userGear = await Gear.find({ email });\n //     return NextResponse.json(\n //       { message: \"Gear retrieved successfully\", gear: userGear },\n //       { status: 200 }\n //     );\n //   } catch (error) {\n //     return NextResponse.json(\n //       { message: \"An error occurred while retrieving gear.\", error },\n //       { status: 500 }\n //     );\n //   }\n // }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dlYXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE2QztBQUNLO0FBR0g7QUFDZDtBQUNqQyw2Q0FBNkM7QUFFdEMsZUFBZUksS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBRUYsTUFBTUMsVUFBVSxNQUFNTiwyREFBZ0JBLENBQUNDLDJEQUFXQTtRQUVsRCxJQUFJLENBQUNLLFNBQVM7WUFDWixPQUFPQyxTQUFTQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbEU7UUFFQSxNQUFNLEVBQUVDLElBQUksRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTVYsSUFBSUcsSUFBSSxJQUFJLG1CQUFtQjtRQUVuRixNQUFNTiw0REFBY0EsSUFBSSwwQkFBMEI7UUFFbEQsTUFBTWMsVUFBVSxJQUFJYixvREFBSUEsQ0FBQztZQUN2QlE7WUFDQUM7WUFDQUM7WUFDQUM7WUFDQUM7WUFDQUUsT0FBT1gsUUFBUVksSUFBSSxDQUFDRCxLQUFLO1FBQzNCO1FBQ0EsTUFBTUUsU0FBUyxNQUFNSCxRQUFRSSxJQUFJLElBQUksbUJBQW1CO1FBRXhELE9BQU9iLFNBQVNDLElBQUksQ0FDbEJXLFFBQ0E7WUFBRVQsUUFBUTtRQUFJO0lBRWxCLEVBQUUsT0FBT1csT0FBTztRQUNkLE9BQU9kLFNBQVNDLElBQUksQ0FDbEI7WUFBRUMsU0FBUztRQUF1QyxHQUNsRDtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRjtBQUVPLGVBQWVZLElBQUlqQixHQUFZO0lBQ3BDLE1BQU1DLFVBQVUsTUFBTU4sMkRBQWdCQSxDQUFDQywyREFBV0E7SUFFbEQsSUFBSSxDQUFDSyxTQUFTO1FBQ1osT0FBT0MsU0FBU0MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNsRTtJQUVBLElBQUk7UUFDRixNQUFNUiw0REFBY0E7UUFDcEIsTUFBTXFCLFdBQVcsTUFBTXBCLG9EQUFJQSxDQUFDcUIsSUFBSSxDQUFDO1lBQUVQLE9BQU9YLFFBQVFZLElBQUksQ0FBQ0QsS0FBSztRQUFDO1FBRTdELE9BQU9WLFNBQVNDLElBQUksQ0FBQ2UsVUFBVTtZQUFFYixRQUFRO1FBQUk7SUFDL0MsRUFBRSxPQUFPVyxPQUFPO1FBQ2RJLFFBQVFKLEtBQUssQ0FBQyx3QkFBd0JBO1FBQ3RDLE9BQU9kLFNBQVNDLElBQUksQ0FBQztZQUFFQyxTQUFTO1FBQXdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzNFO0FBQ0YsRUFFQSwrQ0FBK0M7Q0FDL0MsVUFBVTtDQUNWLDJEQUEyRDtDQUUzRCxzQkFBc0I7Q0FDdEIsNEVBQTRFO0NBQzVFLFFBQVE7Q0FFUiwyRUFBMkU7Q0FFM0UseURBQXlEO0NBRXpELG1GQUFtRjtDQUVuRix1QkFBdUI7Q0FDdkIsOEZBQThGO0NBQzlGLFFBQVE7Q0FFUiw0REFBNEQ7Q0FFNUQsdUZBQXVGO0NBQ3ZGLHNCQUFzQjtDQUN0Qiw0QkFBNEI7Q0FDNUIsK0RBQStEO0NBQy9ELHdCQUF3QjtDQUN4QixTQUFTO0NBQ1QsTUFBTTtDQUNOLElBQUk7Q0FHSixrQ0FBa0M7Q0FDbEMsNENBQTRDO0NBQzVDLFVBQVU7Q0FDVixpREFBaUQ7Q0FDakQsK0NBQStDO0NBRS9DLG9CQUFvQjtDQUNwQixrQ0FBa0M7Q0FDbEMsNkNBQTZDO0NBQzdDLDBCQUEwQjtDQUMxQixXQUFXO0NBQ1gsUUFBUTtDQUVSLDhCQUE4QjtDQUU5QixtREFBbUQ7Q0FFbkQsZ0NBQWdDO0NBQ2hDLG9FQUFvRTtDQUNwRSx3QkFBd0I7Q0FDeEIsU0FBUztDQUNULHNCQUFzQjtDQUN0QixnQ0FBZ0M7Q0FDaEMsd0VBQXdFO0NBQ3hFLHdCQUF3QjtDQUN4QixTQUFTO0NBQ1QsTUFBTTtDQUNOLElBQUkiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9hcHAvYXBpL2dlYXIvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvdXRpbHMvYXV0aE9wdGlvbnNcIjtcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuXG5pbXBvcnQgeyBjb25uZWN0TW9uZ29EQiB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XG5pbXBvcnQgR2VhciBmcm9tIFwiQC9tb2RlbHMvZ2VhclwiO1xuLy9pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG5cbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmFtZSwgbGluaywgd2VpZ2h0LCB1bml0LCBjb21tZW50IH0gPSBhd2FpdCByZXEuanNvbigpOyAvLyBHZXQgZ2VhciBkZXRhaWxzXG5cbiAgICBhd2FpdCBjb25uZWN0TW9uZ29EQigpOyAvLyBDb25uZWN0IHRvIHRoZSBkYXRhYmFzZVxuXG4gICAgY29uc3QgbmV3R2VhciA9IG5ldyBHZWFyKHtcbiAgICAgIG5hbWUsXG4gICAgICBsaW5rLFxuICAgICAgd2VpZ2h0LFxuICAgICAgdW5pdCxcbiAgICAgIGNvbW1lbnQsXG4gICAgICBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsXG4gICAgfSk7XG4gICAgY29uc3QgbmV3RG9jID0gYXdhaXQgbmV3R2Vhci5zYXZlKCk7IC8vIFNhdmUgdG8gZGF0YWJhc2VcblxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgbmV3RG9jLFxuICAgICAgeyBzdGF0dXM6IDIwMSB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICAgIHsgbWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgZ2Vhci5cIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG5cbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG4gICAgY29uc3QgdXNlckdlYXIgPSBhd2FpdCBHZWFyLmZpbmQoeyBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsIH0pO1xuXG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24odXNlckdlYXIsIHsgc3RhdHVzOiAyMDAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGdlYXI6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcTogUmVxdWVzdCkge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcblxuLy8gICAgIGlmICghc2Vzc2lvbikge1xuLy8gICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4vLyAgICAgfVxuXG4vLyAgICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcmVxLmpzb24oKTsgLy8gRXh0cmFjdCB0aGUgSUQgZnJvbSByZXF1ZXN0IGJvZHlcblxuLy8gICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7IC8vIENvbm5lY3QgdG8gdGhlIGRhdGFiYXNlXG5cbi8vICAgICBjb25zdCBnZWFySXRlbSA9IGF3YWl0IEdlYXIuZmluZE9uZSh7IF9pZDogaWQsIGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwgfSk7XG5cbi8vICAgICBpZiAoIWdlYXJJdGVtKSB7XG4vLyAgICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSXRlbSBub3QgZm91bmQgb3IgdW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbi8vICAgICB9XG5cbi8vICAgICBhd2FpdCBHZWFyLmRlbGV0ZU9uZSh7IF9pZDogaWQgfSk7IC8vIERlbGV0ZSB0aGUgaXRlbVxuXG4vLyAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkdlYXIgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIiB9LCB7IHN0YXR1czogMjAwIH0pO1xuLy8gICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuLy8gICAgICAgeyBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGRlbGV0aW5nIGdlYXIuXCIgfSxcbi8vICAgICAgIHsgc3RhdHVzOiA1MDAgfVxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuXG4vLyBHRVQgTUVUSE9EIFRPIEZFVENIIFVTRVInUyBHRUFSXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpO1xuLy8gICAgIGNvbnN0IGVtYWlsID0gc2VhcmNoUGFyYW1zLmdldChcImVtYWlsXCIpO1xuXG4vLyAgICAgaWYgKCFlbWFpbCkge1xuLy8gICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuLy8gICAgICAgICB7IG1lc3NhZ2U6IFwiRW1haWwgaXMgcmVxdWlyZWQuXCIgfSxcbi8vICAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4vLyAgICAgICApO1xuLy8gICAgIH1cblxuLy8gICAgIGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG5cbi8vICAgICBjb25zdCB1c2VyR2VhciA9IGF3YWl0IEdlYXIuZmluZCh7IGVtYWlsIH0pO1xuXG4vLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuLy8gICAgICAgeyBtZXNzYWdlOiBcIkdlYXIgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseVwiLCBnZWFyOiB1c2VyR2VhciB9LFxuLy8gICAgICAgeyBzdGF0dXM6IDIwMCB9XG4vLyAgICAgKTtcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4vLyAgICAgICB7IG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmV0cmlldmluZyBnZWFyLlwiLCBlcnJvciB9LFxuLy8gICAgICAgeyBzdGF0dXM6IDUwMCB9XG4vLyAgICAgKTtcbi8vICAgfVxuLy8gfVxuXG4iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiY29ubmVjdE1vbmdvREIiLCJHZWFyIiwiUE9TVCIsInJlcSIsInNlc3Npb24iLCJSZXNwb25zZSIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwibmFtZSIsImxpbmsiLCJ3ZWlnaHQiLCJ1bml0IiwiY29tbWVudCIsIm5ld0dlYXIiLCJlbWFpbCIsInVzZXIiLCJuZXdEb2MiLCJzYXZlIiwiZXJyb3IiLCJHRVQiLCJ1c2VyR2VhciIsImZpbmQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/gear/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectMongoDB: () => (/* binding */ connectMongoDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectMongoDB = async ()=>{\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGO_URI);\n    // console.log(\"Connected to MongoDB\");\n    } catch (error) {\n        console.log(\"Error connecting to MongoDB: \", error);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFekIsTUFBTUMsaUJBQWlCO0lBQzVCLElBQUk7UUFDRixNQUFNRCx1REFBZ0IsQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxTQUFTO0lBQzVDLHVDQUF1QztJQUN6QyxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ0Y7SUFDL0M7QUFDRixFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvbGliL21vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5leHBvcnQgY29uc3QgY29ubmVjdE1vbmdvREIgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT19VUkkpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIE1vbmdvREJcIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBjb25uZWN0aW5nIHRvIE1vbmdvREI6IFwiLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImNvbm5lY3RNb25nb0RCIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT19VUkkiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/gear.ts":
/*!************************!*\
  !*** ./models/gear.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n// Define the Gear schema\nconst GearSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    link: {\n        type: String,\n        required: false\n    },\n    weight: {\n        type: Number,\n        required: false\n    },\n    unit: {\n        type: String,\n        required: true\n    },\n    comment: {\n        type: String,\n        required: false\n    },\n    email: {\n        type: String,\n        required: true\n    }\n});\n// Define the Gear model with proper TypeScript typing\nconst Gear = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Gear || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Gear\", GearSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gear);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvZ2Vhci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkQ7QUFZN0QseUJBQXlCO0FBQ3pCLE1BQU1FLGFBQWEsSUFBSUQsNENBQU1BLENBQVE7SUFDbkNFLE1BQU07UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3JDQyxNQUFNO1FBQUVILE1BQU1DO1FBQVFDLFVBQVU7SUFBTTtJQUN0Q0UsUUFBUTtRQUFFSixNQUFNSztRQUFRSCxVQUFVO0lBQU07SUFDeENJLE1BQU07UUFBRU4sTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3JDSyxTQUFTO1FBQUVQLE1BQU1DO1FBQVFDLFVBQVU7SUFBTTtJQUN6Q00sT0FBTztRQUFFUixNQUFNQztRQUFRQyxVQUFVO0lBQUs7QUFDeEM7QUFFQSxzREFBc0Q7QUFDdEQsTUFBTU8sT0FBcUJiLHdEQUFlLENBQUNhLElBQUksSUFBSWIscURBQWMsQ0FBUSxRQUFRRTtBQUVqRixpRUFBZVcsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2NodXBpZy9Eb2N1bWVudHMvUHJvamVjdC9IaWtlSHViL21vZGVscy9nZWFyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBEb2N1bWVudCwgU2NoZW1hLCBNb2RlbCB9IGZyb20gXCJtb25nb29zZVwiO1xuXG4vLyBEZWZpbmUgdGhlIEdlYXIgZG9jdW1lbnQgaW50ZXJmYWNlXG5pbnRlcmZhY2UgSUdlYXIgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIG5hbWU6IHN0cmluZztcbiAgbGluaz86IHN0cmluZztcbiAgd2VpZ2h0PzogbnVtYmVyO1xuICB1bml0OiBzdHJpbmc7XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbn1cblxuLy8gRGVmaW5lIHRoZSBHZWFyIHNjaGVtYVxuY29uc3QgR2VhclNjaGVtYSA9IG5ldyBTY2hlbWE8SUdlYXI+KHtcbiAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIGxpbms6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgd2VpZ2h0OiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIHVuaXQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBjb21tZW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfVxufSk7XG5cbi8vIERlZmluZSB0aGUgR2VhciBtb2RlbCB3aXRoIHByb3BlciBUeXBlU2NyaXB0IHR5cGluZ1xuY29uc3QgR2VhcjogTW9kZWw8SUdlYXI+ID0gbW9uZ29vc2UubW9kZWxzLkdlYXIgfHwgbW9uZ29vc2UubW9kZWw8SUdlYXI+KFwiR2VhclwiLCBHZWFyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgR2VhcjtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIkdlYXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwibGluayIsIndlaWdodCIsIk51bWJlciIsInVuaXQiLCJjb21tZW50IiwiZW1haWwiLCJHZWFyIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/gear.ts\n");

/***/ }),

/***/ "(rsc)/./models/user.ts":
/*!************************!*\
  !*** ./models/user.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            'Email is required'\n        ],\n        unique: true,\n        trim: true,\n        match: [\n            /.+\\@.+\\..+/,\n            'Please enter a valid email address'\n        ]\n    },\n    password: {\n        type: String\n    },\n    occupation: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.users || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"users\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvdXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkQ7QUFTM0QsTUFBTUcsYUFBYSxJQUFJRCw0Q0FBTUEsQ0FBUTtJQUNqQ0UsTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQUMsT0FBTztRQUNMSCxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0UsUUFBUTtRQUNSQyxNQUFNO1FBQ05DLE9BQU87WUFBQztZQUFjO1NBQXFDO0lBQzdEO0lBQ0FDLFVBQVU7UUFDUlAsTUFBTUM7SUFDUjtJQUNBTyxZQUFZO1FBQ1ZSLE1BQU1DO0lBQ1I7QUFDRixHQUNBO0lBQUVRLFlBQVk7QUFBSztBQUdyQixNQUFNQyxPQUFPZCw0Q0FBTUEsQ0FBQ2UsS0FBSyxJQUFvQmhCLHFEQUFjLENBQUMsU0FBU0c7QUFDckUsaUVBQWVZLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9tb2RlbHMvdXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgTW9kZWwsIG1vZGVscywgU2NoZW1hIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIge1xuICBuYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIG9jY3VwYXRpb246IHN0cmluZztcbn1cblxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsICdFbWFpbCBpcyByZXF1aXJlZCddLFxuICAgICAgdW5pcXVlOiB0cnVlLCBcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXRjaDogWy8uK1xcQC4rXFwuLisvLCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyddXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBvY2N1cGF0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuY29uc3QgVXNlciA9IG1vZGVscy51c2VycyBhcyBNb2RlbDxJVXNlcj4gfHwgbW9uZ29vc2UubW9kZWwoXCJ1c2Vyc1wiLCB1c2VyU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJtb2RlbHMiLCJTY2hlbWEiLCJ1c2VyU2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImVtYWlsIiwidW5pcXVlIiwidHJpbSIsIm1hdGNoIiwicGFzc3dvcmQiLCJvY2N1cGF0aW9uIiwidGltZXN0YW1wcyIsIlVzZXIiLCJ1c2VycyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/user.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgear%2Froute&page=%2Fapi%2Fgear%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgear%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgear%2Froute&page=%2Fapi%2Fgear%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgear%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_chupig_Documents_Project_HikeHub_app_api_gear_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/gear/route.ts */ \"(rsc)/./app/api/gear/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/gear/route\",\n        pathname: \"/api/gear\",\n        filename: \"route\",\n        bundlePath: \"app/api/gear/route\"\n    },\n    resolvedPagePath: \"/Users/chupig/Documents/Project/HikeHub/app/api/gear/route.ts\",\n    nextConfigOutput,\n    userland: _Users_chupig_Documents_Project_HikeHub_app_api_gear_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZWFyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZnZWFyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZ2VhciUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmNodXBpZyUyRkRvY3VtZW50cyUyRlByb2plY3QlMkZIaWtlSHViJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNhO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvY2h1cGlnL0RvY3VtZW50cy9Qcm9qZWN0L0hpa2VIdWIvYXBwL2FwaS9nZWFyL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9nZWFyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2VhclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2Vhci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9jaHVwaWcvRG9jdW1lbnRzL1Byb2plY3QvSGlrZUh1Yi9hcHAvYXBpL2dlYXIvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgear%2Froute&page=%2Fapi%2Fgear%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgear%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgear%2Froute&page=%2Fapi%2Fgear%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgear%2Froute.ts&appDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchupig%2FDocuments%2FProject%2FHikeHub&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();