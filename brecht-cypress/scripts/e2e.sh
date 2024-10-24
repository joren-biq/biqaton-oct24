#!/bin/sh
export CYPRESS_trashAssetsBeforeRuns=false

check_errors()
{
    # This function should receive 1 argument

    # The function validates that the exit code of the previous command equals 0
    # If the exit code does not equal 0, this value is stored in a variable
    if [ "${1}" -ne "0" ]; then
        exit_code=${1}
    fi
}

process_output()
{
    # This function should receive 1 argument

    # The function moves screenshots and video files in a folder
    # the name of this folder is the string which was provided as argument
    # the features in the json report are also suffixed with that same name
    if [ $# -eq 1 ]
    then
        if [ -d cypress/screenshots ] && [ `ls cypress/screenshots/ | grep -v admin.*.feature | wc -l` -gt 0 ]
        then
            mkdir -p cypress/reports/screenshots/$1
            cd cypress/screenshots/
            mv `ls | grep -v admin.*.feature` ../reports/screenshots/$1/
            cd ../..
        fi

        if [ -d cypress/videos ] && [ `ls cypress/videos/ | grep -v admin.*.feature.mp4 | wc -l` -gt 0 ]
        then
            mkdir -p cypress/reports/videos/$1
            cd cypress/videos/
            mv `ls | grep -v admin.*.feature.mp4` ../reports/videos/$1/
            cd ../..
        fi

        jq ".[].name += \" ($1)\"" cypress/reports/json/cucumber.json > cypress/reports/json/$1.json
        rm cypress/reports/json/cucumber.json
    fi
}

exit_code=0

if [ $# -eq 0 ]
then

    # Make sure we are in the root of the cypress folder, regardless from where we trigger this script
    cd ${0%/*}/..

    # Remove old outputs and reports
    rm -rf cypress/reports/*
    rm -rf cypress/screenshots
    rm -rf cypress/videos

    # Run on mobile
    npm run cy:run:mobile
    check_errors $?
    process_output "mobile"

    # Run on tablet
    npm run cy:run:tablet
    check_errors $?
    process_output "tablet"

    # Run on laptop
    npm run cy:run:laptop
    check_errors $?
    process_output "laptop"

    # Run on desktop
    npm run cy:run:desktop
    check_errors $?
    process_output "desktop"

    # Report
    npm run generateReport

else
    echo "Expecting no arguments. Exiting..."
    exit_code=1
fi

exit $exit_code