(function(dust){dust.register("contactsHtml",body_0);function body_0(chk,ctx){return chk.w("<div id=\"list\"><table><thead><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Work</th></thead><tbody>").s(ctx.get(["contactList"], false),ctx,{"block":body_1},{}).w("</tbody></table></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<tr><td> ").f(ctx.get(["firstName"], false),ctx,"h").w(" </td><td> ").f(ctx.get(["lastName"], false),ctx,"h").w(" </td><td> ").f(ctx.get(["email"], false),ctx,"h").w(" </td><td> ").f(ctx.get(["phone"], false),ctx,"h").w(" </td><td> ").f(ctx.get(["work"], false),ctx,"h").w(" </td><td> <a href=\"#\" onclick=\"editContact('").f(ctx.get(["id"], false),ctx,"h").w("')\"> Edit </a></td><td> <a href=\"#\" onclick=\"deleteContact('").f(ctx.get(["id"], false),ctx,"h").w("')\"> Delete </a></td></tr>");}body_1.__dustBody=!0;return body_0}(dust));