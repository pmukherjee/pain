/**
 * Created by davidbagno on 11/22/13.
 */
const oAuthURI = "https://hadev.agilexhealth.com:8443/ssoeproxy/veteran/authorize?response_type=code&state=stateId&client_id=MobileBlueButton&redirect_uri=https://hadev.agilexhealth.com:8443/MobileHealthPlatformWeb/oauthtoken?original_redirect_uri%3Dhttp://localhost:63342/jqm-root/index.html#goals&scope=read";

var userLoggedIn = false;
database = {};

(function ($){
    database.resourceLink = Backbone.Model.extend( {
        defaults: {
            "rel":"external",
            "title":"",
            "href":"",
            "id":""
        },
        initialize: function() {
            this.id = this.get('title');
        }
    });

    database.resources = Backbone.Collection.extend( {
        model: database.resourceLink,
        url: "http://hadev.agilexhealth.com:8080/MobileHealthPlatformWeb/rest/public/resource-directory",
        parse: function(response) {
            return response.link;
        },
        initialize: function() {
            this.fetch({async: false});
        },
        fetch: function(options) {
            options = options || {};
            options.dataType = "xml";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    database.initiate = function() {
        database.resources = new database.resources();
    };
})(jQuery);

$(document).on("pageinit", "#home", function () {
    database.initiate();
});

$(document).bind("pagebeforechange", function(e, data) {
   if (typeof data.toPage == "string") {
       var path = $.mobile.path.parseUrl(data.toPage),
           linkOne = /^#my-goals/,
           linkTwo = /^#pain-report/;
       if (path.hash.search(linkOne) !== -1 || path.hash.search(linkTwo) !== -1) {
           if (!userLoggedIn) {
               window.location = oAuthURI;
           }
       }
   }
});

function printTest(divID){
    w=window.open();
    w.visibility='none';

w.document.innerHTML=document.getElementById(divID).innerHTML
w.print();
w.close();
}
function printDiv(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
        "<html><head><title></title></head><body>" +
            divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    window.history.back(-1);
   //document.body.innerHTML = oldPage;


}
function doLearn(x){
switch(x)
{
    case "1":

        document.getElementById("painTitle").innerHTML="Acute vs. Chronic";
        document.getElementById("painText").innerHTML="Pain can be acute (short lived) or chronic (long lasting). Most pain is acute- like the pain you'd get if you broke your arm. Acute pain is a signal of an injury and the need to protect yourself by not using that arm until it has healed. When pain lasts more than 3 months, it is chronic.</br></br> Chronic pain is not an alert of more injury, even though you are still hurting.  It is like a broken car horn; you still hear the sound even though there is no danger. Stopping activity is not helpful. In fact, not moving enough causes your muscles to lose strength and become tight and sore, causing more pain. There are other ways the treatment of chronic and acute pain are different.</br></br>  When pain is acute, treatment may include rest and medication and possibly surgery.  When pain is chronic, medication may be part of treatment but the addition of pain management skills is also important. Many people with chronic pain get relief from medication, but they still have some remaining pain. Use of pain management skills, like those found in this app, can help you self-manage your pain. The pain management skills can help you find ways to be more active, exercise, stretch, manage stress, improve your sleep and support your mood; all of which will help to reduce your pain.";
        break;
    case "2":
        document.getElementById("painTitle").innerHTML="Pain Cycle";
        document.getElementById("painText").innerHTML="Chronic pain can affect the whole person, not just the area where you experience pain.  Why does pain have such widespread effects? When people have chronic pain they often try to cope by reducing their activity and trying to protect the painful area. Unfortunately, over time reduced activity can lead to more, not less pain. Reduced activity leads to weaker muscles, which leads to even more pain, which in turn leads to even further reduced activity.</br></br> Over time, lack of activity results in sore, tight, weak muscles and possibly muscle spasms, which adds another layer of pain on top of the original area of pain. Sleep may suffer as a result. Lack of activity can also lead to feelings of sadness, boredom, frustration and loneliness. As a result, people may withdraw from others or have a &quot;shorter fuse&quot; with friends.  They may worry more, or may think more negatively. All of these things can aggravate pain and decrease quality of life.  Not everyone will experience all of these effects, but it is common to experience at least some of them.</br></br> How can you break the cycle of pain?  This app can't remove the underlying pain, but it can help you manage the common factors that aggravate pain like reduced activity and decreased mood and socializing. There are tools and information on this app to help you increase your activity level, improve your sleep, deal with stress and muscle tension and improve your mood.";
        break;
    case "3":
        document.getElementById("painTitle").innerHTML="Chronic vs. 'Psychogenic Pain'";
        document.getElementById("painText").innerHTML="Perhaps no other issue has done as much damage to individuals with chronic pain as this one. Many individuals and health care professionals fail to recognize the complexity of pain and believe that it can be labeled based on the presence or absence of physical findings, secondary gain, or prior emotional problems. As a result, countless individuals have been informed that &quot;The pain is all in your head&quot;.</br></br> In actuality, the correspondence between physical findings (e.g., MRI, CT, or X-ray results) and pain complaints is fairly low (generally, 40% to 60%). Individuals may have abnormal tests (e.g., MRI shows a &quot;bulging disk&quot; or a herniation) with no pain, or substantial pain with negative results. This is because chronic pain can develop in the absence of the skeletal changes that are able to be detected with current technology. Muscle strain and inflammation are common causes of chronic pain, yet may be extremely difficult to detect. Other conditions may be due to systemic problems (e.g., HIV-related pain or sickle cell pain), trauma to nerves (e.g., post-thoracotomy pain), circulatory difficulties (e.g., diabetic neuropathy), nervous system dysfunction (e.g., central pain syndromes), or many others.</br></br> Yet, in each of these cases the medical community and other may be unable to &quot;see&quot; the cause of the problem. Instead, the existence of pain relies on the person's report of their pain, coupled with behavioral observations and available medical data. The lack of physical finding to correlate with pain does not mean that the pain is psychogenic. Rather, it means that currently medical science is unable to detect or understand its cause.   This does not mean that the pain is untreatable.";
        break;
    case "4":
        document.getElementById("painTitle").innerHTML="Flare-Ups";
        document.getElementById("painText").innerHTML="It is normal to have times when your pain gets worse. This is called a &quot;flare-up&quot;.  It's important to know that everyone has pain flare-ups from time to time. They are not a sign that your problem is getting worse or that treatment has not worked. They are to be expected. The most important thing you can do is to plan for how you will deal with them when they do happen.<br/><br/><b>Parts of a Flare-Up</b><br/><br/>You feel an increase in pain.    You have unhealthy thoughts. (&quot;Nothing helps&quot;, &quot;I can't stand this&quot;.)    Your mood gets worse (feeling depressed or angry)    Finally, you become less active (going to bed, spending more time on the couch, stop using pain skills).<br/><br/><b>Take Care of Yourself</b><br/><br/>One of the best ways to avoid a flare-up is to continue to take care of yourself. Stay active, use your skills, do fun things and get enough sleep. These things are important for everyone, not just people with chronic pain.<br/><br/><b>What to Do When You Have A Flare-Up</b><br/><br/>Make a Plan: Prepare for flare-ups in pain when you are feeling good. It's hard to think clearly when you are in extreme pain. Become aware of emotional or physical signs that a flare-up is coming. Is there a pattern of events or activities that seem to lead to a pain flare-up? For example, does your pain get worse when you are really stressed? Prepare and practice positive things to say and do, to better deal with your pain. Tools within this app can help you with this.    Use Your Plan: Use the strategies that you have learned and switch if one is not working.    Change Thoughts: When you are in pain, lookout for unhealthy thoughts that make things worse. Remind yourself that you have handled this much pain before, and you can do it again    Remember What Works: Pay attention to the times when you are doing a good job dealing with your pain. Make sure you praise yourself. Remember how you dealt with your pain and plan to do this when the pain returns. For example, you might think <i>&quot;It helps to relax more when my pain is bad,&quot;</i> or <i>&quot;even though it was about as bad as it gets for me, I handled it pretty well.&quot;";
        break;
    case "5":
        document.getElementById("painTitle").innerHTML="Relaxation and Pain";
        document.getElementById("painText").innerHTML="Chronic pain is stressful. When people are in pain they often feel tense, on edge, frustrated or nervous.  When you experience pain and stress your muscles naturally tense and over time this can lead them to tighten, shorten and even spasm. This muscle tightness adds a second layer of pain and discomfort on top of your original pain. When you practice relaxation, your muscles relax and the muscle tension begins to lessen, relieving some of your pain.<br/><br/>Relaxation techniques are skills you can use to gain control over the stress and muscle tension that worsens pain. Tools within this app, like deep breathing, progressive muscle relaxation and visualization, can help you to manage stress and tension and reduce pain. You will get the best results if you practice relaxation every day, even if it is only for a few minutes.  Regular practice will help prevent tension from building up and you will get better at using the skill with more practice.<br/><br/>Relaxation can help you: <li>Relieve muscle tension and tension headaches</li><li>Relax muscles before tension builds and pain gets worse</li><li>Feel calm and relaxed</li><li>Reduce pain</li><li>Cope with pain wherever you are</li><li>Improve your sleep</li><li><p>People often think that learning to relax means slowing down or being less productive. Being relaxed does not mean you have to slow down or be lazy. In fact, if you are relaxed you can think more clearly and get more done!<br/><br/><b>So, How do I Relax?</b><br/>The deep breathing, progressive muscle relaxation and visualization tools in the Manage Section of this app are designed to help you relax.  Give them a try and discuss relaxation techniques with your health care provider.</p></li>";
        break;
    case "6":
        document.getElementById("painTitle").innerHTML="Mood and Pain";
        document.getElementById("painText").innerHTML="When pain increases, you may notice your mood becomes negative. You may feel depressed, worried, stressed or angry.  When your mood is not positive, your pain can worsen and you may lose motivation to use pain management tools. This can start a chain reaction of more pain and an even more negative mood. If you become angry, stressed, depressed or frustrated, you may do things that worsen your mood and pain such as: <li>Being less active</li><li>Avoiding chores or other activities</li><li>Isolating yourself from others</li><li>Avoiding pleasant activities</li><li>Tensing your muscles</li><li><p>If you notice you are in a negative mood, try using the pain management tools in this app. Using these tools can help you get you back in control, improve your mood and lessen your pain.</p></li>";
        break;
    case "7":
        document.getElementById("painTitle").innerHTML="Pain Management - Veteran";
        document.getElementById("painText").innerHTML="Effective pain management involves you and your provider working together to maximize your pain relief and ability to function. Tools that can be used to manage pain are exercise, stretching, physical therapy and medical interventions like medication and surgery as appropriate. You can also learn to use pain management tools, like those described in the app, so you can manage pain on your own.  Another way you can be actively involved in your care is to pay attention to the things that aggravate and relieve your pain and report these things to your provider. This information is helpful for understanding how to best manage your pain.  Regular assessment of your pain and functioning can help you and your provider understand what is working and if the management plan needs to be changed.  You can be a valuable partner to the treatment team in achieving your goals.<br/><br/>The goals of pain management are to:<ul><li>Improve quality of life and function</li>    <li>Lower pain levels</li><li>Increase pain self-management skills</li><li>Reduce the emotional distress caused by chronic pain</li></ul>";
        break;
    case "8":
        document.getElementById("painTitle").innerHTML="Pain Management - Caregiver Perspective";
        document.getElementById("painText").innerHTML="Constant pain is common with serious injuries; sometimes the cause is clear, at other times, even with testing, doctors cannot find the cause.<br/>By becoming knowledgeable about the Veteran's pain management program, the Caregiver of a Veteran experiencing chronic pain, can be a valuable partner to the Veteran and VA treatment team in achieving  his/her goals.<br/>Pain management programs are tailored to the needs of the Veteran and seek to:<ul>    <li>Improve the Veteran's quality of life and function</li>    <li>Increase the Veteran's skill in self-management to address persistent pain</li>    <li>Lower the Veteran's level of pain</li>    <li>Reduce the Veteran's emotional distress caused by chronic pain</li></ul>";
        break;
    case "9":
        document.getElementById("painTitle").innerHTML="Gate Control Theory";
        document.getElementById("painText").innerHTML="The gate control theory is used as a way to explain how your pain intensity can change when there seems to be no physical change to your condition. In this theory there is a &quot;gate&quot; that can change the information being sent to the brain about your pain. Things like thoughts, feelings, physical symptoms, and relationships can open the gate and cause more pain or close the gate, causing you to feel less pain.<br/><br/>How can this happen? Pain has two components - a neurological event (damage to the body) and the perception of that event (how much pain we feel, or how focused we are on our pain). The damage to the body is a significant factor that contributes to increased perception of pain, but it is not the only factor. For example, have you ever found yourself in a situation when your pain did not seem that bad, or when you did not notice it? The damage in your body has not changed, yet your perception of pain did. This highlights the role of other factors in the perception of pain.<br/><br/>Biological, social and psychological factors can all play a role in aggravating pain (opening the gate) and relieving pain (closing the gate). Damage to the body represents the biological part of pain. Other biological factors that can make pain worse include too much or too little  physical activity. Some biological factors that can help to reduce pain include medications, injections, or surgical procedures.<br/><br/>We know that psychological states such as depression, anxiety, anger, and fear can worsen pain (opening the gate) and the absence of these factors is associated with decreased pain perception and greater tolerance of pain (closing the gate). Socially, isolation, limited engagement in activity, reduction of pleasurable and constructive activities, and difficult interactions with others can contribute to worsening of pain (opening the gate), while engagement in pleasurable activities, socializing, and achieving goals can reduce focus on pain (closing the gate).";
        break;
    case "10":
        document.getElementById("painTitle").innerHTML="Non-medication based treatment";
        document.getElementById("painText").innerHTML="Although medication is often used to treat pain, there are many other effective forms of treatment that can be used in addition to medication or instead of medication.  It is helpful to be aware of these treatment options because some people find that their pain is not eliminated even when they take medication.  Others prefer not to take medication or take only a minimal amount.  Using one or more of the treatments below can help you manage your pain effectively.  There are several available on this app. If you are interested in trying one that is not on this app  or wonder if it might be helpful for you, ask your provider.<br/><br/>On this app<ul><li>Deep breathing</li><li>Visualization</li><li>Progressive muscle relaxation</li><li>Exercise</li><li>Stretching</li><li>Sleep tips</li><li>Icing</li><li>Practicing healthy thinking about pain</li></ul>Other<ul><li>Physical therapy</li><li>Chiropractic</li><li>Massage</li><li>TENs unit</li><li>Heating pads or warm baths</li><li>Meditation</li><li>Cognitive behavioral therapy (group or individual)</li></ul>";
        break;
    case "11":
        document.getElementById("painTitle").innerHTML="Using Pain Medications Safely (Tips)";
        document.getElementById("painText").innerHTML="All Pain Medications:<ul><li>Only take the dose written on the bottle. Taking extra medications when you feel worse can be very dangerous. Some treatments might be more effective to ease sickness or pain, such as counseling for stress, improving eating habits or increasing physical activity.  These changes can be just as effective, and longer-lasting, than more medications.</li>    <li>Make sure your doctor knows all medications you are taking, especially if you are seeing more than one doctor. Some medications should not be mixed with others so your doctor needs to know everything you are taking.</li>    <li>If you find that the same amount of medication no longer gives you pain relief, be sure to talk to your doctor before making any changes. He or she might be able to help. Do not increase the dose yourself.</li></ul>Acetaminophen (Tylenol)<ul><li>Too much can lead to liver damage and, with very high doses, death. If you drink more than 3 alcoholic drinks a day, your risk of liver damage is even greater.</li>    <li>Be aware that many prescription pain medications and over the counter cold medications contain acetaminophen as an ingredient.  This can lead to accidentally taking too much.</li></ul>NSAIDs (Motrin, Advil, Celebrex, Aspirin, Ibuprofen, Naproxen, Aleve)<ul><li>Too much can cause stomach bleeding, ulcers or kidney damage.  This risk may increase for people who are over 60 years old, have high blood pressure, or have heart disease.</li></ul>";
        break;
    case "12":
        document.getElementById("painTitle").innerHTML="Medication Side Effects";
        document.getElementById("painText").innerHTML="All medications have side effects.  Many are minor, but some can be severe.  Sometime the side effect is actually a direct action of the medication such as being sleepy after taking diphenhydramine (Benedryl&reg;).  Unwanted side effects are more common when medications are taken in combination with other medications.  The combinations of medications and certain foods can also cause side effects.  Always make sure the doctors treating your pain are aware of all the medications that you are taking to include over the counter medications and supplements.<br/><br/>Tell your doctor if any of these symptoms are severe or do not go away:<ul><li>headache or heaviness in head    <li>nausea</li>    <li>stomach pain</li>    <li>constipation</li>    <li>weakness or tiredness</li>    <li>dry mouth</li></ul>Some side effects can be serious. If you experience any of the following symptoms, call your doctor immediately:<ul><li>chest pain</li><li>fast, pounding, or irregular heartbeat</li><li>shortness of breath</li><li>itching</li><li>difficulty breathing or swallowing</li><li>swelling of the face, throat, tongue, lips, eyes, hands, feet, ankles, or lower legs</li><li>dizziness or lightheadedness</li><li>fainting</li><li>painful erection that lasts longer than normal</li></ul><b>In case of overdose, call your local poison control center at 1-800-222-1222. Or call local emergency services at 911.</b>";
        break;
    case "13":
        document.getElementById("painTitle").innerHTML="Pain’s Impact on your Life";
        document.getElementById("painText").innerHTML="Chronic pain affects many areas of a person's life.  Pain can affect your activity level, physical health, mood, relationships and thoughts.  Below are some examples:<br/><br/><b>Activity:</b> You may give up activities and exercise that you enjoy because of your pain.  You may work less than you used to, in or out of your home.<br/><br/><b>Physical:</b>  You may feel muscle soreness, tightness, loss of strength in your whole body. You may feel tired a lot of the time. You may gain weight because you are not as active.<br/><br/><b>Mood:</b>  You may feel sad, frustrated, hopeless, angry, nervous, bored or scared.<br/><br/><b>Social Life:</b> You may withdraw from others or have a &quot;shorter fuse&quot; with friends.  You may feel lonely because you are not able to get out as much as you used to. You may miss being around other but not really feel up to socializing.<br/><br/><b>Thoughts:</b> You may spend a lot of time thinking about your pain and the ways it has changed your life. You may worry more, or you may think more negatively.";
        break;
    case "14":
        document.getElementById("painTitle").innerHTML="Fear of Movement";
        document.getElementById("painText").innerHTML="When you have pain it is common to worry that exercise, activity and movement will make your pain worse or even cause injury. Some people will change the way they walk, start to move very gingerly or try to perform tasks using only the non-injured side of their body. Although it seems protective, guarding the injured area like this can interfere with proper body alignment and cause more pain in the injured area or new pain in the compensating area. Other times people become so fearful of movement they give up almost all activities or lie down most of the day. But, moving less will lead to tight, weak muscles that tire very easily. This will actually cause even more pain. You can break this cycle by slowly becoming more active. Adding stretching and a gentle and safe exercise (like walking or swimming) into your life will help you rebuild muscles and have less pain. There is more information on stretching and exercise in this app.<br/><br/><img src='FearOfMovement.png'>";
        break;
    case "15":
        document.getElementById("painTitle").innerHTML="Stress and Pain (Veteran Perspective)";
        document.getElementById("painText").innerHTML="It's easy to feel stressed out when the pressures of work, finances, family, and everyday life are weighing on you. These stresses not only affect you emotionally, they can cause physical pain as well.<br/><br/>Stress and pain are often closely linked. So, part of managing your pain is learning how to manage stress.<br/><br/>Stress reduces oxygen and blood flow to the muscles and creates constant tension that can make muscles tense up and spasm. This can cause headache and muscle pain, or make existing pain worse.  Stress can also have other negative effects on your health. For example, stress can affect sleep, raise blood pressure and lower the immune system.<br/><br/>Simple tools can help lower stress levels, reduce pain, and improve overall health.<br/><br/>Here are some tips:<ul><li>Get moving- Being active and exercising can help decrease stress levels</li>    <li>Get a good night's sleep- Proper sleep can also help you cope with stress</li>   <li>Find a balance - Our schedules are often packed, with little down time. Try to find time to do a few enjoyable activities or a few times to rest each week.</li>    <li>Relax - Relaxation techniques such as deep breathing, yoga, guided imagery, and meditation can help you clear your mind and relax your body.</li>    <li>Seek support- Reach out to friends and family. Evaluation by a mental health professional with expertise in pain management can also help you deal with both stress and chronic pain.</li></ul>";
        break;
    case "16":
        document.getElementById("painTitle").innerHTML="Stress and Pain (Caregiver Perspective)";
        document.getElementById("painText").innerHTML="For caregivers, it's important to know how pain can affect your loved one and how it can affect you. Everyday life stresses can affect people emotionally and it can aggravate their pain as well. Stress and pain are often closely linked. So, part of managing pain is learning how to manage stress.<br/><br/>Stress reduces oxygen and blood flow to the muscles and creates tension that can make muscles tense up and spasm. This can cause headache and muscle pain, or make existing pain worse.  Stress can also have other negative effects on health. For example, stress can affect sleep, raise blood pressure and lower the immune system.<br/><br/>Simple tools can help lower stress levels, reduce pain, and improve overall health. Encourage your loved one to be aware of stress and its effect on pain. As a caregiver, you should also be aware of how stress can affect you. Caregivers often experience stress related to caring for a loved one.  It is just as important for you to care for yourself as it is for you to care for the person with chronic pain.  Most people are not able to care for others effectively when they are feeling stressed themselves.<br/><br/>Here are some tips that work for people in pain and caregivers:<ul><li>Get moving- Being active and exercising can help decrease stress levels</li>    <li>Get a good night's sleep- Proper sleep can also help you cope with stress</li>    <li>Find a balance - Our schedules are often packed, with little down time. Try to find time to do a few enjoyable activities or a few times to rest each week.</li>    <li>Relax- Relaxation techniques such as deep breathing, yoga, guided imagery, and meditation can help you clear your mind and relax your body.</li>    <li>Seek support- Reach out to friends and family. Evaluation by a mental health professional with expertise in pain management can also help you deal with both stress and chronic pain.</li></ul>";
        break;
    case "17":
        document.getElementById("painTitle").innerHTML="Relationships and Pain (Veteran Perspective)";
        document.getElementById("painText").innerHTML="Chronic pain can affect you in many ways, including negatively affecting your relationships with others.  You may withdraw from others when in pain or have a &quot;shorter fuse&quot; with friends or family.  You may feel lonely because you are not able to get out as much.  You may feel so down that socializing seems like too much work.Learning to use pain management tools can help you manage your pain, which not only helps you feel better, but may allow you to enjoy the company of others more as well.  One way to start this process is to ask important people in your life to join you in learning the pain coping skills in this app.  Including others can help them understand your pain, and the extra support may help you stay on track. To get started, try doing something fun or getting together with someone from your contact list.";
        break;
    case "18":
        document.getElementById("painTitle").innerHTML="Relationships and Pain (Caregiver Perspective)";
        document.getElementById("painText").innerHTML="Chronic pain can affect the Veteran you care for in many ways, including negatively affecting their relationships with others.  He or she may withdraw from others when in pain or have a &quot;shorter fuse&quot; with friends or family.  They may feel lonely because they are not able to get out as much.  They may feel so down that socializing seems like too much work.<br/>Learning pain coping skills can help the Veteran manage their pain, which not only helps them feel better, but may allow them to enjoy the company of others more as well.  As a caregiver you can support this process by learning more about chronic pain and the pain management tools in this app with the veteran.  Going with the Veteran when they try a new activity or just offering encouragement and recognition of their efforts to try something new can be helpful. If you aren't sure how best to support the Veteran you care for, often the best thing to do is to ask.";
        break;
    case "19":
        document.getElementById("painTitle").innerHTML="Pain and Work";
        document.getElementById("painText").innerHTML="People with chronic pain often experience changes in their ability to work.  These changes may include not being able to work at all or having to change jobs.  Others may continue to work with some level of difficulty due to the pain they experience. Work changes or job loss can have negative effects such as financial difficulties, loss of pride or sense of purpose, boredom and isolation.  Some people benefit from the schedule that comes with working to get them out of bed in the morning or out of the house every day. Without this schedule they may feel unmotivated or have difficulty completing tasks.  Feelings of sadness, isolation, loneliness or shame may make it even more difficult for people to find the motivation to manage their pain. But, these negative outcomes are not a given. People can feel a sense of accomplishment even if they are not able to work by doing productive things around the house. Volunteering is another way to find a renewed sense of purpose and to make a contribution.  Even something as simple as getting dressed and out of the house daily or planning one or two activities each day can help keep motivation and mood from dipping.  Visit the goal setting section of this app for tips on setting and sticking to goals as well as some example goals.";
        break;
    case "20":
        document.getElementById("painTitle").innerHTML="Caregiver Tips";
        document.getElementById("painText").innerHTML="Caregivers can help Veterans by learning about the cause of their pain and understanding their pain management plan.<br/><br/>You can help by:<ul><li>Believing the Veteran's report of pain</li>    <li>Providing medications exactly as prescribed and storing them securely</li>    <li>Tracking pain levels, pain triggers and alleviating factors and discussing them with the Veteran's Treatment Team</li>    <li>Not over-focusing on pain levels</li>    <li>Appreciating that activity, functioning and movement are important pain management goals</li>    <li>Assisting with and encouraging use of tools in this application</li>    <li>Engaging with the Veteran in enjoyable activities that may distract from pain</li>    <li>Paying attention to nonverbal indicators of pain:</li>    <ul>    <li>Facial expression</li>    <li>Breathing and sighing heavily</li>    <li>Limping or other unusual movement</li>    <li>Not wanting to eat or sleep</li>    <li>Crying or irritability</li>    </ul></ul>";
        break;
    case "21":
        document.getElementById("painTitle").innerHTML="Caregiver Resources";
        document.getElementById("painText").innerHTML="<b>Caregiver Support Line</b>   1-855-260-3274 (Toll-free)<br/>Monday through Friday 8:00 am &mdash; 11:00 pm ET<br/>Saturday 10:30 am &mdash; 6:00 pm ET<br/><br/><b>Caregiver Support Coordinator</b><br/>Your local Caregiver Support Coordinator is a licensed professional who can support you by matching you with services for which you are eligible, and providing you with valuable information about resources that can help you stay smart, strong and organized as you care for the Veteran you love. Find your local Caregiver Support Coordinator by visiting our &quot;Help Near Home&quot; page  (<a href=http://www.caregiver.va.gov/help_landing.asp><b>http://www.caregiver.va.gov/help_landing.asp</b></a>)  and entering your zip code.<br/><br/><b>Caregiver Services (<a href=http://www.caregiver.va.gov/support_services.asp>http://www.caregiver.va.gov/support_services.asp</a>)</b><br/>VA offers a number of services that can provide you with the support that's right for you. Whether you and the Veteran you care for could use some help at home or you just need someone to listen, we're here to support you. Follow the link to learn more about the variety of services available to Family Caregivers.<br/><br/><b>Caregivers Toolbox (<a href=http://www.caregiver.va.gov/toolbox_landing.asp>http://www.caregiver.va.gov/toolbox_landing.asp</a>)</b><br/>As a Family Caregiver, you know better than anyone else that caring for a Veteran requires major organizational skills. Whether you are new to family caregiving or looking for fresh tips and resources, VA has created this Caregiver Tool Box to help you find tools that work for you. This page offers resources and information to help you stay on top of things and manage the daily stresses of family caregiving.<br/><br/><b>Staying Strong (<a href=http://www.caregiver.va.gov/strong_landing.asp>http://www.caregiver.va.gov/strong_landing.asp</a>)</b><br/>Taking care of the Veteran you love is often your primary focus for the day. But sometimes, staying strong for that Veteran and your family can feel exhausting, and leave you without much time for yourself.  The links on this page provide information and tips to help you stay strong and stay informed. After all, your health is essential to your ability to keep providing for the Veteran you love.<br/><br/><b>New Services for Family Caregivers of Post-9/11 Veterans (<a href=http://www.caregiver.va.gov/support_benefits.asp>http://www.caregiver.va.gov/support_benefits.asp</a>)</b><br/>If you are the Family Caregiver of a Veteran who was injured post-9/11, you may be eligible for additional services through VA, including a stipend, comprehensive training and medical coverage through VA if you are not already covered by a plan. Follow the link to learn more about the newest services and to see if you are currently eligible.<br/><br/><b>Make the Connection<br/><a href=http://maketheconnection.net>http:maketheconnection.net</a></b><br/>This site connects Veterans, their friends and family members with information resources and solutions  issues affecting their health, well-being and everyday lives.  Hear inspiring stories of strength. Learn what has worked for other Veterans.";
        break;
    case "22":
        document.getElementById("painTitle").innerHTML="Miscellaneous";
        document.getElementById("painText").innerHTML="<ul><li><a href=http://www.tampa.va.gov/chronicpain/>Chronic Pain Rehabilitation Program</a>: The Chronic Pain Rehabilitation Program (CPRP) is an award-winning, comprehensive, inpatient pain treatment program established in 1988 to help veterans with chronic pain cope with their conditions. National referrals welcome.</li><li><a href=http://www.theacpa.org>American Chronic Pain Association</a>: The American Chronic Pain Association (ACPA) is a non-profit, tax exempt organization providing a support system for those suffering with chronic pain through education and self-help group activities.</li><li><a href=http://www.painmed.org/patientcenter/main.aspx>American Academy of Pain Medicine &ndash; Patient Center</a>: The American Academy of Pain Medicine (AAPM) Patient Center is a public information center that provides general information about pain and helps people locate a dedicated pain specialist in their area.</li><li><a href=http://uspainfoundation.org/>U.S. Pain Foundation</a>: The U.S. Pain Foundation is an organization that was created by people with pain for people with pain. This foundation is a source of support and hope to those living with pain and their caregivers.</li><li><a href=http://www.americanpainsociety.org/resources/content/aps-for-people-in-pain.html>American Pain Society &ndash; Resources for People in Pain</a>: The American Pain Society (APS) is a multidisciplinary community that brings together a diverse group of scientists, clinicians and other professionals to increase the knowledge of pain and transform public policy and clinical practice to reduce pain-related suffering. Their Resources for People in Pain provides people with successful treatment options and information for many pain situations.</li><li><a href=http://www.arthritis.org/>The Arthritis Foundation</a> provides information on arthritis and related conditions and and pain management.</li><li><a href=http://visn22.kramesonline.com/>The VA Desert Pacific Krames Online</a> has access to more than 4,000 topics relating to health and medication including information about pain.</li><li><a href=http://www.nlm.nih.gov/medlineplus/>MedlinePlus</a> is the National Institutes of Health's Web site for information about diseases and conditions presented in patient friendly language.</li><li><a href=http://www.niams.nih.gov/Health_Info/default.asp>The National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS)</a> health information page provides information about causes, treatment, and prevention of arthritis and musculoskeletal and skin diseases.</li><li><a href=http://www.cityofhope.org/Pages/default.aspx>City of Hope Palliative Care Resource Web Site</a>: This web page contains a collection of links to a broad range of resources for the assessment and treatment of pain. Although the primary focus of the site is palliative care, it provides a significant number of links to general pain management resources.</li><li><a href=http://www.iasp-pain.org/AM/Template.cfm?Section=General_Resource_Links&Template=/CM/HTMLDisplay.cfm&ContentID=3058>IASP Pain Definitions</a>: A sample list of frequently used terms from,  Classification of Chronic Pain, Second Edition, IASP Task Force on Taxonomy, edited by H. Merskey and N. Bogduk, IASP Press, Seattle, &copy; 1994, pp 209-214.</li><li><a href=http://www.headaches.org/>National Headache Foundation</a>: The National Headache Foundation is a non-profit organization dedicated to educating headache sufferers and healthcare professionals about headache causes and treatments.</li><ul>";
        break;
}
}

function hideByClassName(classname) {

    var l = document.getElementsByClassName(classname).length;
    try {
    for (var i = 0; i < l; i++) {document.getElementsByClassName(classname)[i].style.display = "none";}
    }
    catch (err) {
        window.alert(err.toString());
    }

}
function clearToolButtons() {
    var activeButton = "ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a ui-btn-active";
    var l = document.getElementsByClassName(activeButton).length;
    try {


        for (var i = 0; i < l; i++) {

            document.getElementsByClassName(activeButton)[i].className = "ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a";

        }
    }
    catch (err) {
        window.alert(err.toString());
    }

}
function loadDiv(pageurl,divid) {
    $.get(pageurl, function (retData) { $("#" + divid).append(retData); $("#" + divid).trigger('create'); });

}

function loadPage(id, url) {
    var req = false;
    // For Safari, Firefox, and other non-MS browsers
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    } else if (window.ActiveXObject) {
        // For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }
    var element = document.getElementById(id);
    if (!element) {
        alert("Bad id " + id +
            "passed to loadPage." +
            "You need a div or span element " +
            "with this id in your page.");
        return;
    }
    if (req) {
        // Synchronous request, wait till we have it all
        req.open('GET', url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    } else {
        element.innerHTML =
            "Sorry, your browser does not support " +
                "XMLHTTPRequest objects. This page requires " +
                "Internet Explorer 5 or better for Windows, " +
                "or Firefox for any system, or Safari. Other " +
                "compatible browsers may also exist.";
    }
}