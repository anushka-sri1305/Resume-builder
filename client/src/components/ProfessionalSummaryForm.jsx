import { LoaderCircle, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api.js'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!data?.trim()) {
      toast.error("Write something first")
      return
    }

    try {
      setIsGenerating(true)

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: data },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setResumeData(prev => ({
        ...prev,
        professional_summary: response.data.enhancedContent
      }))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500">Add summary for your resume here</p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Write a compelling professional summary..."
      />
    </div>
  )
}

export default ProfessionalSummaryForm
