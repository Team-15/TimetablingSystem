using System.Web;
using System.Web.Optimization;

namespace TimetablingSystem
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            /*          JS          */
            bundles.Add(new ScriptBundle("~/bundles/parent").Include(

                    "~/Scripts/bootstrap.js",
                    "~/ViewScripts/parentScript.js",
                    "~/JS/globalConstants.js",
                    "~/JS/globalFunctions.js",
                    "~/JS/instanceData.js",
                    "~/JS/objectDataTypes.js",
                    "~/JS/weeksManipulator.js",
                    "~/JS/dataManager.js",
                    "~/JS/graphicalGenerator.js",
                    "~/JS/listGenerator.js",
                    "~/JS/filteringEngine.js"

                ));

            bundles.Add(new ScriptBundle("~/bundles/addRequests").Include("~/ViewScripts/addRequestsScript.js"));


            bundles.Add(new ScriptBundle("~/bundles/requests").Include("~/ViewScripts/requestsScript.js" ));

            bundles.Add(new ScriptBundle("~/bundles/results").Include("~/ViewScripts/resultsScript.js"));

            bundles.Add(new ScriptBundle("~/bundles/bookings").Include("~/ViewScripts/bookingsScript.js"));

            bundles.Add(new ScriptBundle("~/bundles/history").Include("~/ViewScripts/historyScript.js"));


            bundles.Add(new ScriptBundle("~/bundles/settings").Include(
                        "~/ViewScripts/settingsScript.js"));

            
            bundles.Add(new ScriptBundle("~/bundles/logout").Include(
                        "~/ViewScripts/logoutScript.js"));


            /*              CSS             */
            //Original
            //bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/authorizeCSS").Include(
                
                    "~/Content/bootstrap/bootstrap.css", 
                    "~/Content/loginLogoutStyle.css"
                
                ));

            bundles.Add(new StyleBundle("~/Content/parentCSS").Include(
                    
                    "~/Content/bootstrap/bootstrap.css",
                    "~/Content/parentStyle.css",
                    "~/Content/filterSectionStyle.css",
                    "~/Content/displayStyle.css",
                    "~/Content/graphicalDisplayStyle.css",
                    "~/Content/listDisplayStyle.css"

                ));

            bundles.Add(new StyleBundle("~/Content/settingsCSS").Include("~/Content/settingsStyle.css"));



            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}