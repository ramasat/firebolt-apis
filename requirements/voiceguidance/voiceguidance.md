# Voice Guidance

Document status: Draft

See [Firebolt Requirements Governance](../governance.md) for more info.

| Contributor    | Organization   |
| -------------- | -------------- |
| Ramasamy Thalavay Pillai | Comcast |

## 1. Overview

Firebolt accessibility module provides capabilities and operations related to various accessibility features viz., closed caption and voice guidance. This document is focussing the voice guidance part of the accessibility Module, and describes the requirements for the same. 

All UI Applications - viz., Aggregated Experience, Trusted Apps and OTT Apps - require to "speak" the screen as the user navigates, so that they could offer "voice guided" navigation experience to those users who are visually impaired or have low vision.

Voice Guidance is typically achieved by the UI applications by passing a text to FireBolt which then converted into a speech and played out. Occassionally,the UI applications may also want to play a sound by directly passing the audio file that has the required sound (ex: Haptic Sound).

Functionally, Voice Guidance enables apps to have the following capabilities:

* Start the Text to Speech Playback, Cancel the playback, Pause and resume the Playback
* Playback related notifications such as speech started, speech ended or other notification such as voice changed, speech rate changed etc. 
* Apps may require to know what state the speech is currently in - for example, Pending, InProgress, Paused, or Complete. 
* App might also want to know the set of supported voices that playback could use along with the corresponding languages

In addition to the above capabilities, there are more sensitive operations such as ability to enable / disable voice guidance, change the language or voice used, change the speech rate or volume of the speech, etc. These are typically made accessible to all apps, however modifiable only by the distributor apps (either a separate settings app or the aggregated experience App or any other trusted distributor app) and exposed through manage SDK.

![Voice Guidance Usage diagram](vg1.png)


## 2. Table of Contents
- [1. Overview](#1-overview)
- [2. Table of Contents](#2-table-of-contents)
- [3. Voice Guidance Settings](#3-vg-settings)
- [4. Voice Guidance Playback](#4-vg-playback)
  - [4.1. Start Playback](#41-start-playback)
  - [4.2. Pause Playback](#42-pause-playback)
  - [4.3. Resume Playback](#43-resume-playback)
  - [4.4. Cancel Playback](#44-cancel-playback)
  - [4.5. Speech State](#5-speech-state)
- [5. Schemas](#5-schemas)
- [6. APIs](#6-apis)
  - [6.1. Core SDK APIs](#61-core-sdk-apis)
    - [6.1.1. VG Settings Object](#611-vgsettings-object)
	- [6.1.2. VG Playback Object](#612-vgplayback-object)
	  - [6.1.2.1. Speak Method](#6121-speak-method)
      - [6.1.2.2. Pause Method](#6122-pause-method)
      - [6.1.2.3. Resume Method](#6123-Resume-method)
      - [6.1.2.4 Cancel Method](#6124-cancel-method)
  - [6.2. Manage SDK APIs](#62-manage-sdk-apis)
    - [6.2.1. VG Settings Object](#621-vgsettings-object)

## 3. Voice Guidance Settings

Voice Guidance settings shall include the following:
* enabled: 
  * Description: Whether or not voice guidance should be enabled in the system 
  * type: boolean 
  * Get / Set Support: Both get and set are supported
  * Notifications: onenabledchanged
* speed: The speed of the voice (number). Note: Deprecate this.
* speechrate:
  * Description: The speech rate of the voice
  * type: string 
  * Get / Set Support: Both get and set are supported
  * Notifications: onspeechratechanged
* language:
  * Description: The current selection of the language in which the text to be spoken with. IETF BCP 47 code, ex: en-US
  * type: string 
  * Get / Set Support: Both get and set are supported
  * Notifications: onlanguagechanged
* voice:
  * Description: The voice corresponds to the currently selected language. Should be one of the system supported voice. Please refer "voicelist" method
  * type: string 
  * Get / Set Support: Both get and set are supported
  * Notifications: onvoicechanged
* ttsvolume:
  * Description: The volume of the voice guidance voice (number - 1 to 100)
  * type: number 
  * Get / Set Support: Both get and set are supported
  * Notifications: onvolumechanged
* playervolume:
  * Description: The volume of the primary player volume during the vg playback (number - 1 to 100)
  * type: number 
  * Get / Set Support: Only set is supported
  * Notifications: N/A
* fallbacktext:
  * Description: Text that needs to be converted into voice and spoken, whenever there is a temporary issue in converting the passed text. For ex: tts engine not reachable.
  * type: string 
  * Get / Set Support: Only set is supported
  * Notifications: N/A
* voicelist:
  * Description: The list of supported languages and the corresponding voices (ex: en-US language that has support for two voices "Ava" and "carol")
  * type: array 
  * Get / Set Support: Only get is supported
  * Notifications: N/A
  
Note: Existing "accessibility.voiceGuidanceSettings()" that returns VoiceGuidanceSettings object shall be enhanced to cover these settings. It currently supports only enabled and speed. This note shall be dropped once these settings are added to the VoiceGuidanceSettings object.

The "Set" for all of the above properties are made available through manage sdk, where as "get" is made available through core sdk.

## 4. Voice Guidance Playback

As described in the Overview, Voice Gudiance allows any given application to pass a text and convert that into a speech, and then playback the speech.

The following are the set of actions that can be performed on the Firebolt Voice Guidance APIs.

### 4.1. Start Playback

An app SHALL initiate a **Speech session** by passing the text (that needs to be converted into speech) using the speak method. Each Speech session has an associated **speech id** that will be returned to the application(s) upon successful initiation of the speech session. The Text that is passed to the Firebolt VG may be a normal text or in SSML compliant format.

Speak method may result in number of notifications, as mentioned below, depending on the states that the speak request goes through in its life cycle until the speech session ends: 
* Will Speak: The speech request is accepted and a speech session is created for further processing of the text passed.
* Speech Starts: Conversion process of text into speech starts.
* Speech Interrupted: Happens when speech is already in-progress. Current speech is interrupted either by another speech request, or by calling the cancel method, or by disabling VG (by Distributor App).
* Speech Complete: Triggered when the speech complete. Marks the end of the speech session.
* Network Error: Triggered when the device is facing temporary or permanant network failure and hence is not able to start the text to speech conversion using the TTS cloud endpoint.
* Playback Error: The text is successfully converted into a speech, however there is a failure at platform level in playing the converted speech.

To Do: Add details or references to these notifiations.

### 4.2. Pause Playback

A speech session shall be paused (when the corresponding playback is in progress) by explicitely asking the Firebolt VG to pause the speech by providing the **speech id**. If there is no speech to be paused (for ex., the speech may have already ended), the firebolt VG handles that request gracefully and returns appropraite response.

Pause method may result in the folllowing notification: 
* Speech Paused: Triggered when the speech is successfully paused.

To Do: Add details or references to these notifiations.

### 4.3. Resume Playback

A speech session shall be resumed (when it has been paused previously) by explicitely asking the Firebolt VG to resume the speech by providing the **speech id**.

Resume method may result in the folllowing notification: 
* Speech resumed: Triggered when the speech is successfully paused.

To Do: Add details or references to these notifiations.

### 4.4. Cancel Playback

A speech session shall be cancelled by explicitely asking the Firebolt VG to cancel the ongoing or paused speech by providing the **speech id**.

Resume method may result in the folllowing notification: 
* Speech interrupted: Triggered when the speech speech session is successfully stopped. Also marks the end of the session.

To Do: Add details or references to these notifiations.

### 4.5. Speech State

Firebolt VG Speech goes through differnt states in it's life cycle, and includes the following:
* Pending - The Speech has not stated yet, but the conversion process is in place, or the request is in queue (To DO: Should we support queueing of multiple Speech Requests?) 
* InProgress - Speech is in progress
* Paused - Speech is currently paused
* NotFound - Speech already completed and the session is no longer valid

The current state of the speech session SHALL be rtrieved by the application using Firebolt VG APIs by passing the  **speech id**


## 5. Schemas

To Do!


## 6. APIs

APIs for Text To Speech are covered in ......


### 6.1. Core SDK APIs

These APIs are intended for all firebolt apps - trusted as well as partner apps.


#### 6.1.1. VG Settings Object

To DO


#### 6.1.2. VG Playback Object

To DO


##### 6.1.2.1. Speak Method

To DO


##### 6.1.2.2. Pause Method

To DO


##### 6.1.2.3. Resume Method

To DO


##### 6.1.2.4 Cancel Method

To DO


### 6.2. Manage SDK APIs

These APIs are intended for all firebolt apps - trusted as well as partner apps.


#### 6.2.1. VG Settings Object

To DO
