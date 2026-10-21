import "../style/home.scss"

export default function Home() {
    return (
        <main className="home">
            <section className="report-builder" aria-labelledby="report-title">
                <header className="report-header">
                    <span className="eyebrow">
                        <span aria-hidden="true">✦</span> AI tailored preparation
                        <span className="status-dot" aria-hidden="true" />
                    </span>
                    <h1 id="report-title">Generate Your Custom Interview Readiness Report</h1>
                    <p>
                        Align your real-world experience against role requirements with instant gap
                        analysis, likely questions, and tailored STAR responses.
                    </p>
                </header>

                <form className="interview-input-group">
                    <section className="panel job-panel" aria-labelledby="job-title">
                        <div className="panel-heading">
                            <span className="heading-icon" aria-hidden="true">▱</span>
                            <div>
                                <h2 id="job-title">Target Job Description</h2>
                                <p>Role specifications &amp; technical criteria</p>
                            </div>
                            <span className="heading-note">Paste text or requirements</span>
                        </div>

                        <label className="visually-hidden" htmlFor="jobDescription">
                            Target job description
                        </label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            placeholder={`Paste full job description, responsibilities, required qualifications, or key skills...\n\n e.g. "We are looking for a Staff Frontend Engineer proficient in React, TypeScript, and micro-frontend architectures with 6+ years designing high-throughput web applications..."`}
                        />
                        <div className="field-footer">
                            <span><span className="footer-dot" /> Add the full role description for best results</span>
                            <button className="text-button" type="reset">Clear</button>
                        </div>
                    </section>

                    <div className="right">
                        <section className="panel resume-panel" aria-labelledby="resume-title">
                            <div className="panel-heading">
                                <span className="heading-icon" aria-hidden="true">▣</span>
                                <div>
                                    <h2 id="resume-title">Resume</h2>
                                </div>
                                <span className="heading-note"><span aria-hidden="true">✧</span> Upload resume &amp; self description together for best results</span>
                            </div>

                            <label className="upload-area" htmlFor="resume">
                                <input type="file" name="resume" id="resume" accept=".pdf,application/pdf" />
                                <span className="upload-icon" aria-hidden="true">⇧</span>
                                <strong>Click to browse for your PDF</strong>
                                <span className="upload-hint">PDF up to 10MB (ATS format optimized)</span>
                            </label>
                        </section>

                        <section className="panel description-panel" aria-labelledby="description-title">
                            <div className="panel-heading">
                                <span className="heading-icon" aria-hidden="true">▧</span>
                                <div>
                                    <h2 id="description-title">Self Description &amp; Career Narrative</h2>
                                </div>
                                <span className="heading-note">Optional boost</span>
                            </div>

                            <label className="visually-hidden" htmlFor="selfDescription">
                                Self description and career narrative
                            </label>
                            <textarea
                                id="selfDescription"
                                name="selfDescription"
                                placeholder="Describe yourself in a few sentences — your background, core strengths, years of experience, or specific areas you want to highlight for this interview..."
                            />
                        </section>

                        <button className="button primary-button generate-button" type="button">
                            <span aria-hidden="true">ϟ</span>
                            Generate Interview Report
                            <span className="button-arrow" aria-hidden="true">→</span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}
