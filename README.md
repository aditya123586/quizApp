# Introduction

It is a quiz application that allows users to answer multiple-choice
questions and receive feedback on their performance.

# API Sample

TODO: Refer Folder resterAPIExport and import it in rester for testing APIS.

# Request Flow By Layering

Routes-->Validation Checks From Middleware--->Respective Service Layer--->Respective Manager (For Concurrent Manupulation)--->Data Acces layer (Layer dedicated to DB here we are using Local Created DB)
